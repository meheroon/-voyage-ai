import { Response } from "express";
import {
  generateItinerary,
  generateContent,
  getRecommendations,
  analyzeTravelData,
  generateDestinationDescription,
} from "../services/ai.service";
import Itinerary from "../models/Itinerary";
import User from "../models/User";
import Destination from "../models/Destination";
import { AuthRequest } from "../types";

export const createItinerary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { destination, startDate, endDate, budget, travelers, preferences } = req.body;

    if (!destination || !startDate || !endDate) {
      res.status(400).json({ success: false, message: "Destination, start date, and end date are required" });
      return;
    }

    const itineraryText = await generateItinerary(
      destination,
      startDate,
      endDate,
      budget || 2000,
      travelers || 1,
      preferences || []
    );

    const itinerary = await Itinerary.create({
      user: req.user?.id,
      title: `Trip to ${destination}`,
      destination,
      startDate,
      endDate,
      budget: budget || 2000,
      travelers: travelers || 1,
      preferences: preferences || [],
      itinerary: [],
    });

    res.status(201).json({
      success: true,
      data: {
        itineraryId: itinerary._id,
        content: itineraryText,
        meta: { destination, startDate, endDate, budget, travelers },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const generateTripContent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { type, topic, length, tone } = req.body;

    if (!type || !topic) {
      res.status(400).json({ success: false, message: "Type and topic are required" });
      return;
    }

    const content = await generateContent(type, topic, length || "medium", tone || "informative");

    res.json({ success: true, data: { content, meta: { type, topic, length, tone } } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAIRecommendations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id);
    const pastDestinations = await Destination.find({ createdBy: req.user?.id }).select("title location.city");

    const recommendations = await getRecommendations(
      user?.preferences?.interests || [],
      user?.preferences?.budget || "moderate",
      user?.preferences?.travelStyle || "balanced",
      pastDestinations.map((d) => `${d.title}, ${d.location.city}`)
    );

    res.json({ success: true, data: { recommendations, basedOn: { preferences: user?.preferences } } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const analyzeData = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data } = req.body;

    if (!data) {
      res.status(400).json({ success: false, message: "Data is required for analysis" });
      return;
    }

    const analysis = await analyzeTravelData(data);

    res.json({ success: true, data: { analysis } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const generateAIDescription = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, location, category, highlights } = req.body;

    if (!title || !location || !category) {
      res.status(400).json({ success: false, message: "Title, location, and category are required" });
      return;
    }

    const description = await generateDestinationDescription(title, location, category, highlights || []);

    res.json({ success: true, data: description });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyItineraries = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const itineraries = await Itinerary.find({ user: req.user?.id }).sort("-createdAt");
    res.json({ success: true, data: itineraries });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
