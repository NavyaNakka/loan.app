import mongoose from "mongoose";


const schema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: { type: String },
        email: { type: String },
        gender: { type: String, enum: ["Male", "Female", "Other"] },
        pincode: { type: String },
        panNumber: { type: String },
        employmentType: { type: String, enum: ["Salaried", "Self-Employed"] },
        yearlyIncome: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("User", schema);
