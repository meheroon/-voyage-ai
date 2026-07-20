import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User";
import { AuthRequest } from "../types";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id: string, email: string, role: string): string => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  } as jwt.SignOptions);
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: "All fields are required" });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({ success: false, message: "Email already registered" });
      return;
    }

    const user = await User.create({ name, email: email.toLowerCase(), password });
    const token = generateToken(user._id.toString(), user.email, user.role);

    res.status(201).json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, role: user.role },
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Registration failed" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    if (user.provider === "google" && !user.password) {
      res.status(400).json({ success: false, message: "Please login with Google" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = generateToken(user._id.toString(), user.email, user.role);

    res.json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, role: user.role },
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Login failed" });
  }
};

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { credential } = req.body;

    if (!credential) {
      res.status(400).json({ success: false, message: "Google credential is required" });
      return;
    }

    // Verify the Google token server-side
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(401).json({ success: false, message: "Invalid Google token" });
      return;
    }

    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      res.status(400).json({ success: false, message: "Email not available from Google" });
      return;
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await User.create({
        name: name || email.split("@")[0],
        email: email.toLowerCase(),
        avatar: picture || "",
        provider: "google",
      });
    } else {
      if (picture) user.avatar = picture;
      user.provider = "google";
      await user.save();
    }

    const token = generateToken(user._id.toString(), user.email, user.role);

    res.json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, role: user.role },
        token,
      },
    });
  } catch (error: any) {
    console.error("Google login error:", error.message);
    res.status(500).json({ success: false, message: error.message || "Google login failed" });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        preferences: user.preferences,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, avatar, preferences } = req.body;
    const user = await User.findById(req.user?.id);

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await user.save();

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        preferences: user.preferences,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
