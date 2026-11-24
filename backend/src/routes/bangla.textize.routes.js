import { Router } from "express";
import { postBanglaTextize } from "../controller/bangla/textize.bangla.controller.js";

const router = Router();
router.post("/textize/bangla", postBanglaTextize);

export default router;
