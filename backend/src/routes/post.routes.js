import { Router } from "express";
import { getPosts, getPost } from "../controller/post.controller.js";
const router = Router();
router.get("/posts", getPosts);
router.get("/posts/:slug", getPost);
export default router;
