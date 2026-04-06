// import app from "./index.js";
// import connectDB from "./config/db.js";

// connectDB();

// app.listen(process.env.PORT, () => {
//   console.log("🚀 Server running on port 5000");
// });
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

import app from "./index.js";
import connectDB from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});