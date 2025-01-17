import express from "express";
import { importChatHistory } from "../controllers/chat-controller";
import { authenticate } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = express.Router();

router.post(
  "/bulk-upload",
  authenticate,
  upload.single("file"),
  importChatHistory
);

export default router;
