// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import routes from "./routes/applicationRoutes.js";
// import userStatusRoutes from "./routes/userstatusRoutes.js";

// app.use("/api/status", userStatusRoutes);

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api", routes);

// export default app;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes/applicationRoutes.js";
import userStatusRoutes from "./routes/userstatusRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express(); // 🔥 FIRST create app

// ✅ CORS Configuration - Allow frontend domain
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// 🔥 Routes
app.use("/api", routes);
app.use("/api/status", userStatusRoutes);
app.use("/api/auth", authRoutes);

export default app;