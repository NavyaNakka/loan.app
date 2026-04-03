import express from "express";
import {
	applyLoan,
	checkApplicationByPhone,
	getApplicationDetailsByPhone,
	getUserByPhone,
	markLenderInProgressByPhone,
	updateApplicationDetailsByPhone,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/apply", applyLoan);
router.get("/user/:phone", getUserByPhone);
router.get("/application/check", checkApplicationByPhone);
router.get("/application/details", getApplicationDetailsByPhone);
router.patch("/application/lender-progress", markLenderInProgressByPhone);
router.put("/application/details", updateApplicationDetailsByPhone);

export default router;