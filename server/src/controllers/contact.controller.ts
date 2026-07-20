import { Request, Response } from "express";

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ success: false, message: "Name, email, and message are required" });
      return;
    }

    // In production, this would send an email via nodemailer/SendGrid
    // For now, log the submission and return success
    console.log("Contact form submission:", { name, email, subject, message, timestamp: new Date().toISOString() });

    res.json({
      success: true,
      message: "Your message has been received. We'll get back to you within 24 hours.",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Failed to submit contact form" });
  }
};
