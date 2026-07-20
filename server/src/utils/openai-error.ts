import { Response } from "express";

export function handleAIError(error: any, res: Response): boolean {
  const message = error?.message || String(error);

  if (message.includes("API key") || message.includes("GEMINI_API_KEY")) {
    res.status(503).json({
      success: false,
      message: "AI service authentication failed. Please contact the administrator.",
    });
    return true;
  }

  if (message.includes("429") || message.includes("rate") || message.includes("RESOURCE_EXHAUSTED")) {
    res.status(429).json({
      success: false,
      message: "AI service is temporarily unavailable due to rate limits. Please try again later.",
      retryAfter: 30,
    });
    return true;
  }

  if (message.includes("quota") || message.includes("billing") || message.includes("PAYMENT")) {
    res.status(503).json({
      success: false,
      message: "AI service quota has been exhausted. Please contact the administrator.",
    });
    return true;
  }

  return false;
}
