import { Router } from "express";
import {
  getDestinations,
  getDestinationById,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination,
  getFeaturedDestinations,
  getMyDestinations,
  addReview,
} from "../controllers/destination.controller";
import { authenticate, optionalAuth } from "../middleware/auth";

const router = Router();

router.get("/", optionalAuth, getDestinations);
router.get("/featured", optionalAuth, getFeaturedDestinations);
router.get("/my", authenticate, getMyDestinations);
router.get("/slug/:slug", optionalAuth, getDestinationBySlug);
router.get("/:id", optionalAuth, getDestinationById);
router.post("/", authenticate, createDestination);
router.put("/:id", authenticate, updateDestination);
router.delete("/:id", authenticate, deleteDestination);
router.post("/:id/reviews", authenticate, addReview);

export default router;
