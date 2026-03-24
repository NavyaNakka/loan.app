import express from "express";
import { applyLoan } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/apply", applyLoan);

export default router;