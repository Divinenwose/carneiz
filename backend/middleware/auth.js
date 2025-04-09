import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

// Middleware to verify user authentication
const authMiddleware = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found." });
        }
        
        next();
    } catch (error) {
        const errorMessage = error.name === "TokenExpiredError" 
            ? "Token expired. Please log in again." 
            : "Invalid token.";
        res.status(401).json({ message: errorMessage });
    }
};

export default authMiddleware;
