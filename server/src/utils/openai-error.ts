import { Response } from "express";

export function handleAIError(error: any, res: Response): boolean {
  const message = error?.message || String(error);

  if (message.includes("API key") || message.includes("GROQ_API_KEY") || message.includes("Unauthorized")) {
    res.status(503).json({
      success: false,
      message: "AI service authentication failed. Please contact the administrator.",
    });
    return true;
  }

  if (message.includes("429") || message.includes("rate") || message.includes("Rate limit")) {
    res.status(429).json({
      success: false,
      message: "AI service is temporarily busy. Please try again in a moment.",
      retryAfter: 5,
    });
    return true;
  }

  if (message.includes("quota") || message.includes("billing") || message.includes("insufficient")) {
    res.status(503).json({
      success: false,
      message: "AI service quota has been exhausted. Please contact the administrator.",
    });
    return true;
  }

  return false;
}
