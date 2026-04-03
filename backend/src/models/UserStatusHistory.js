import mongoose from "mongoose";

const schema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  status: {
    type: String,
    required: true,
  },
  lastModifiedOn: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("UserStatusHistory", schema);