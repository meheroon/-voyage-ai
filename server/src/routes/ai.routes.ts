import { Router } from "express";
import {
  createItinerary,
  generateTripContent,
  getAIRecommendations,
  analyzeData,
  generateAIDescription,
  getMyItineraries,
} from "../controllers/ai.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/itinerary", authenticate, createItinerary);
router.get("/itineraries", authenticate, getMyItineraries);
router.post("/generate", authenticate, generateTripContent);
router.post("/recommendations", authenticate, getAIRecommendations);
router.post("/analyze", authenticate, analyzeData);
router.post("/description", authenticate, generateAIDescription);

export default router;
