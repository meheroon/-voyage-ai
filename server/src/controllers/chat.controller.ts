import { Response } from "express";
import Conversation from "../models/Conversation";
import { chatWithAI } from "../services/ai.service";
import { handleAIError } from "../utils/openai-error";
import { AuthRequest } from "../types";

export const getConversations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const conversations = await Conversation.find({ user: req.user?.id, isActive: true })
      .sort("-updatedAt")
      .select("title createdAt updatedAt messages")
      .limit(50);

    const conversationsWithLast = conversations.map((c) => ({
      _id: c._id,
      title: c.title,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      lastMessage: c.messages.length > 0 ? c.messages[c.messages.length - 1].content : "",
      messageCount: c.messages.length,
    }));

    res.json({ success: true, data: conversationsWithLast });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getConversation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      user: req.user?.id,
    });

    if (!conversation) {
      res.status(404).json({ success: false, message: "Conversation not found" });
      return;
    }

    res.json({ success: true, data: conversation });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createConversation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const conversation = await Conversation.create({
      user: req.user?.id,
      title: req.body.title || "New Conversation",
      messages: [],
    });

    res.status(201).json({ success: true, data: conversation });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendMessage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { conversationId, message } = req.body;

    if (!message || !conversationId) {
      res.status(400).json({ success: false, message: "Message and conversationId are required" });
      return;
    }

    const conversation = await Conversation.findOne({
      _id: conversationId,
      user: req.user?.id,
    });

    if (!conversation) {
      res.status(404).json({ success: false, message: "Conversation not found" });
      return;
    }

    // Add user message
    conversation.messages.push({ role: "user", content: message, timestamp: new Date() });

    // Generate AI response
    const recentMessages = conversation.messages.slice(-20).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    const aiResponse = await chatWithAI(recentMessages, `User is planning travel. Help them with their travel queries.`);

    // Add AI response
    conversation.messages.push({ role: "assistant", content: aiResponse, timestamp: new Date() });

    // Update title from first message
    if (conversation.messages.length === 2) {
      conversation.title = message.substring(0, 60) + (message.length > 60 ? "..." : "");
    }

    await conversation.save();

    res.json({
      success: true,
      data: {
        conversationId: conversation._id,
        message: { role: "assistant", content: aiResponse, timestamp: new Date() },
      },
    });
  } catch (error: any) {
    if (handleAIError(error, res)) return;
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteConversation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const conversation = await Conversation.findOneAndDelete({
      _id: req.params.id,
      user: req.user?.id,
    });

    if (!conversation) {
      res.status(404).json({ success: false, message: "Conversation not found" });
      return;
    }

    res.json({ success: true, message: "Conversation deleted" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
