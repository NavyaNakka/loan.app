import express from "express";
import { trackAction } from "../controllers/userStatusController.js";

const router = express.Router();

router.post("/track", trackAction);

export default router;



