import express from "express";
import { applyLoan, getUserByPhone } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/apply", applyLoan);
router.get("/user/:phone", getUserByPhone);

export default router;