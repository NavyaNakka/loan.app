import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

export const sendOtp = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ message: "Phone number is required" });
        
        // Mock sending OTP
        console.log(`Sending Mock OTP 1234 to ${phone}`);
        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        if (!phone || !otp) return res.status(400).json({ message: "Phone and OTP are required" });

        // Hardcode OTP for development, later replace with real OTP service
        if (otp !== "1234") {
            return res.status(400).json({ message: "Invalid OTP. Use 1234 for testing." });
        }

        let user = await User.findOne({ phone });

        if (!user) {
            user = await User.create({ phone });
        }

        res.json({
            success: true,
            _id: user._id,
            phone: user.phone,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
