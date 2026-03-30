import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", schema);
