import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (adminId) => {
    return jwt.sign({ adminId }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '24h'
    });
};

// Admin login
export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Find admin by username
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check password
        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = generateToken(admin._id);

        res.json({
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                username: admin.username
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Admin logout (client-side token removal mainly)
export const adminLogout = (req, res) => {
    res.json({ message: "Logout successful" });
};

// Verify admin token
export const verifyAdmin = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        const admin = await Admin.findById(decoded.adminId).select('-password');
        
        if (!admin) {
            return res.status(401).json({ message: "Admin not found" });
        }

        res.json({
            valid: true,
            admin: {
                id: admin._id,
                username: admin.username
            }
        });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};