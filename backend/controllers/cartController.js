import { User } from "../models/userModel.js";


const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || quantity <= 0) {
            return res.status(400).json({ success: false, message: "Invalid product or quantity." });
        }

        // Only for authenticated users
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Check if the product is already in the cart
        const existingItem = user.cart.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity; // Increase quantity instead of overwriting
        } else {
            user.cart.push({ product: productId, quantity });
        }

        await user.save();
        return res.status(200).json({ success: true, message: "Product added to cart.", cart: user.cart });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error.", error: error.message });
    }
};



const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;

        // Only for authenticated users
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        user.cart = user.cart.filter(item => item.product.toString() !== productId);
        await user.save();

        return res.json({ success: true, message: "Item removed from cart.", cart: user.cart });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


const getCart = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
        }

        const user = await User.findById(req.user.id).populate("cart.product");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        return res.status(200).json({ success: true, cart: user.cart });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export  { addToCart, removeFromCart, getCart};