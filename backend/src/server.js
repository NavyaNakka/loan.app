import app from "./index.js";
import connectDB from "./config/db.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log("🚀 Server running on port 5000");
});