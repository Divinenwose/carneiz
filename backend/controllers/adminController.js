import jwt from "jsonwebtoken";
import Admin from '../models/adminModel.js'; 
import axios from 'axios';
import speakeasy from 'speakeasy';
import nodemailer from 'nodemailer';


export const signupAdmin = async (req, res) => {
  const { fullName, email, password, recaptchaToken } = req.body;


  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
    params: {
      secret: secretKey,
      response: recaptchaToken,
    },
  });

  if (!response.data.success) {
    return res.status(400).json({ message: 'Invalid reCAPTCHA. Please try again.' });
  }

  const userExists = await Admin.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const user = await Admin.create({ fullName, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'Signed up successfully! Please log in.', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password, recaptchaToken } = req.body;

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
    params: {
      secret: secretKey,
      response: recaptchaToken,
    },
  });

  if (!response.data.success) {
    return res.status(400).json({ message: 'Invalid reCAPTCHA. Please try again.' });
  }

  const user = await Admin.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  
  const otp = speakeasy.totp({ secret: process.env.OTP_SECRET, encoding: 'base32' });

  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Your OTP for Login',
    text: `Your OTP is: ${otp}`,
  };

  
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Failed to send OTP' });
    }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
})

};

export const logoutAdmin = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

