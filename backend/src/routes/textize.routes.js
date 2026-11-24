import { Router } from "express";
import { postTextize } from "../controller/textize.controller.js";
const router = Router();
router.post("/textize", postTextize);
export default router;
