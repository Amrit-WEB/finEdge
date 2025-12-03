import express from "express";
import { checkRTO } from "../controllers/rtoController.js";

const router = express.Router();

router.get("/check", checkRTO);

export default router;
