// import mongoose from "mongoose";

// const schema = new mongoose.Schema(
//   {
//     fullName: String,
//     phone: {
//       type: String,
//       required: true,
//       unique: true, // 🔥 IMPORTANT
//     },
//     gender: String,
//     pincode: String,
//     loanType: String,
//     loanAmount: Number,
//     yearlyIncome: Number,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("UserInfo", schema);
// import mongoose from "mongoose";

// const schema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       unique: true, // 🔥 custom userId
//     },
//     fullName: String,
//     phone: {
//       type: String,
//       required: true,
//       unique: true, // 🔥 one user per mobile
//     },
//     gender: String,
//     pincode: String,
//     loanType: String,
//     loanAmount: Number,
//     yearlyIncome: Number,
//     sessionId: String, // 🔥 browser link
//   },
//   { timestamps: true }
// );

// export default mongoose.model("UserInfo", schema);
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
      unique: true,
    },
    fullName: String,
    phone: {
      type: String,
      trim: true,
      index: true,
    },
    gender: String,
    pincode: String,
    panNumber: {
      type: String,
      required: true,
      // unique: true, // Allow duplicates for testing
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

    // ✅ ADD THIS 👇 (CONSENT FIX)
    acceptedTerms: {
      type: Boolean,
      required: true,
      default: false,
    },

    // ✅ OPTIONAL (BEST PRACTICE - HIGHLY RECOMMENDED)
    consentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserInfo", schema);