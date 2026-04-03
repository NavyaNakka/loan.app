// Middleware to extract user from JWT
export const requireAuth = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "No token" });
    try {
        const decoded = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET || 'fallback_secret');
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.status(401).json({ message: "User not found" });
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// GET /api/auth/profile
export const getProfile = async (req, res) => {
    const user = req.user;
    res.json({
        phone: user.phone,
        fullName: user.fullName || "",
        email: user.email || "",
        gender: user.gender || "",
        pincode: user.pincode || "",
        panNumber: user.panNumber || "",
        employmentType: user.employmentType || "",
        yearlyIncome: user.yearlyIncome || "",
    });
};

// PUT /api/auth/profile
export const updateProfile = async (req, res) => {
    const user = req.user;
    const fields = ["fullName", "email", "gender", "pincode", "panNumber", "employmentType", "yearlyIncome"];
    fields.forEach((f) => {
        if (req.body[f] !== undefined) user[f] = req.body[f];
    });
    await user.save();
    res.json({ message: "Profile updated", success: true });
};
import User from "../models/User.js";
import UserInfo from "../models/UserInfo.js";
import jwt from "jsonwebtoken";

const DEFAULT_APPROVED_LENDERS = [
    {
        name: "Ram Fincorp",
        url: "https://applyonline.ramfincorp.com/?utm_source=kreditkonnect",
    },
];

const normalizeApprovedLenders = (application) => {
    const approvedLenders = Array.isArray(application?.approvedLenders)
        ? application.approvedLenders
            .map((lender) => ({
                name: String(lender?.name || "").trim(),
                url: String(lender?.url || "").trim(),
            }))
            .filter((lender) => lender.name && lender.url)
        : [];

    if (approvedLenders.length > 0) {
        return approvedLenders;
    }

    const fallbackLenderName = String(application?.lenderName || "Ram Fincorp").trim();
    const fallbackLender = DEFAULT_APPROVED_LENDERS.find((lender) => lender.name === fallbackLenderName);

    return [
        fallbackLender || {
            name: fallbackLenderName || "Ram Fincorp",
            url: "https://applyonline.ramfincorp.com/?utm_source=kreditkonnect",
        },
    ];
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

export const sendOtp = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ message: "Phone number is required" });

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
            return res.status(400).json({ message: "Invalid OTP." });
        }

        let user = await User.findOne({ phone });

        if (!user) {
            user = await User.create({ phone });
        }

        const existingApplication = await UserInfo.findOne({ phone })
            .sort({ createdAt: -1 })
            .select("lenderName lenderStatus approvedLenders");

        res.json({
            success: true,
            _id: user._id,
            phone: user.phone,
            hasApplication: !!existingApplication,
            lenderName: existingApplication?.lenderName || "Ram Fincorp",
            lenderStatus: existingApplication?.lenderStatus || "submitted",
            approvedLenders: normalizeApprovedLenders(existingApplication),
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
