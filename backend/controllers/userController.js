import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import mongoose from "mongoose"; 


const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    console.warn("⚠️ Warning: JWT_SECRET is not set. Tokens may not work.");
    return null;
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      cart: [],
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        message: "Registration successful. Please log in."
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, guestCart = [] } = req.body; 
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    
    if (!Array.isArray(user.cart)) {
      user.cart = [];
    }

    
    guestCart.forEach((guestItem) => {
      const productId = guestItem.product._id || guestItem.product; 
    
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        console.error(`Invalid ObjectId: ${JSON.stringify(guestItem.product)}`);
        return; 
      }
    
      const existingItem = user.cart.find(
        (item) => item.product.toString() === productId
      );
    
      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
      } else {
        user.cart.push({
          product: new mongoose.Types.ObjectId(productId),
          quantity: guestItem.quantity,
        });
      }
    });
    

    
    await user.save();

    
    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      cart: user.cart,
      token,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
