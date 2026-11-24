import { Router } from "express";
import { postEnglishTextize } from "../controller/english/textize.english.controller.js";

const router = Router();
router.post("/textize/english", postEnglishTextize);

export default router;
