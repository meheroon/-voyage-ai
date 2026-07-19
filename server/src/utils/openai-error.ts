import { Response } from "express";

interface OpenAIError extends Error {
  status?: number;
  code?: string;
  error?: { message?: string; type?: string; code?: string };
}

function isOpenAIError(error: any): error is OpenAIError {
  return error?.status !== undefined || error?.code !== undefined || error?.error?.type !== undefined;
}

export function handleOpenAIError(error: any, res: Response): boolean {
  if (!isOpenAIError(error)) return false;

  const status = error.status || 500;
  const message = error.error?.message || error.message;
  const type = error.error?.type;

  if (status === 429) {
    res.status(503).json({
      success: false,
      message: "AI service is temporarily unavailable due to rate limits. Please try again later.",
    });
    return true;
  }

  if (status === 402) {
    res.status(503).json({
      success: false,
      message: "AI service billing quota has been exceeded. Please contact the administrator.",
    });
    return true;
  }

  if (status === 401) {
    res.status(503).json({
      success: false,
      message: "AI service authentication failed. Please contact the administrator.",
    });
    return true;
  }

  if (type === "insufficient_quota") {
    res.status(503).json({
      success: false,
      message: "AI service quota has been exhausted. Please contact the administrator to add billing credits.",
    });
    return true;
  }

  res.status(503).json({
    success: false,
    message: "AI service encountered an error. Please try again later.",
  });
  return true;
}
