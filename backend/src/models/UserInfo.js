
import mongoose from "mongoose";

const lenderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    fullName: String,
    phone: {
      type: String,
      trim: true,
      index: true,
    },
    gender: String,
    pincode: String,
    employmentType: {
      type: String,
      enum: ["Salaried", "Self-Employed"],
    },
    panNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    lenderName: {
      type: String,
      default: "Ram Fincorp",
      trim: true,
    },
    lenderStatus: {
      type: String,
      enum: ["submitted", "in_progress"],
      default: "submitted",
      trim: true,
    },
    approvedLenders: {
      type: [lenderSchema],
      default: [
        {
          name: "Ram Fincorp",
          url: "https://applyonline.ramfincorp.com/?utm_source=kreditkonnect",
        },
      ],
    },
    loanType: String,
    loanAmount: Number,
    yearlyIncome: Number,
    sessionId: String,
    acceptedTerms: {
      type: Boolean,
      required: true,
      default: false,
    },
    consentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserInfo", schema);