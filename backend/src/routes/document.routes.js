import { Router } from "express";
import {
  postDocument,
  getDocuments,
  getDocument,
  deleteDocument,
  deleteAllDocuments,
} from "../controller/document.controller.js";
const router = Router();
router.post("/documents", postDocument);
router.get("/documents", getDocuments);
router.get("/documents/:docId", getDocument);
router.delete("/documents/:docId", deleteDocument);
router.delete("/documents", deleteAllDocuments);
export default router;
