import { Request } from "express";
import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  provider: "local" | "google";
  role: "user" | "admin";
  preferences: {
    budget: string;
    travelStyle: string;
    interests: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IDestination {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: string[];
  category: "beach" | "mountain" | "city" | "cultural" | "adventure" | "luxury" | "budget";
  location: {
    country: string;
    city: string;
    region: string;
  };
  price: number;
  duration: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  included: string[];
  difficulty: "easy" | "moderate" | "challenging";
  season: string[];
  bestFor: string[];
  isFeatured: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  destination: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  pros: string[];
  cons: string[];
  travelDate: Date;
  createdAt: Date;
}

export interface IChatMessage {
  _id: mongoose.Types.ObjectId;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface IConversation {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  title: string;
  messages: IChatMessage[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IItinerary {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  travelers: number;
  preferences: string[];
  itinerary: {
    day: number;
    date: Date;
    activities: {
      time: string;
      activity: string;
      location: string;
      notes: string;
    }[];
  }[];
  createdAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}
