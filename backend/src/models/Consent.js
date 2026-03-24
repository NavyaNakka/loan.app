import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    consentGiven: Boolean,

    consentedAt: {
      type: Date,
      default: Date.now, // ✅ exact time
    },
  },
  { timestamps: true }
);

export default mongoose.model("Consent", schema);