import { Router } from "express";
import {
  getConversations,
  getConversation,
  createConversation,
  sendMessage,
  deleteConversation,
} from "../controllers/chat.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/conversations", authenticate, getConversations);
router.post("/conversations", authenticate, createConversation);
router.get("/conversations/:id", authenticate, getConversation);
router.delete("/conversations/:id", authenticate, deleteConversation);
router.post("/send", authenticate, sendMessage);

export default router;
