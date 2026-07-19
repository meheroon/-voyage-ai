import { Response } from "express";
import Destination from "../models/Destination";
import Review from "../models/Review";
import { AuthRequest } from "../types";

export const getDestinations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      page = "1",
      limit = "12",
      category,
      minPrice,
      maxPrice,
      rating,
      difficulty,
      search,
      sort = "-createdAt",
      featured,
    } = req.query;

    const query: any = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (featured === "true") query.isFeatured = true;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (rating) query.rating = { $gte: Number(rating) };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { "location.city": { $regex: search, $options: "i" } },
        { "location.country": { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const [destinations, total] = await Promise.all([
      Destination.find(query).sort(sort as string).skip(skip).limit(limitNum).populate("createdBy", "name avatar"),
      Destination.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: destinations,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDestinationById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const destination = await Destination.findById(req.params.id).populate("createdBy", "name avatar");
    if (!destination) {
      res.status(404).json({ success: false, message: "Destination not found" });
      return;
    }

    const reviews = await Review.find({ destination: destination._id })
      .populate("user", "name avatar")
      .sort("-createdAt")
      .limit(10);

    const relatedDestinations = await Destination.find({
      _id: { $ne: destination._id },
      category: destination.category,
    })
      .limit(4)
      .select("title slug shortDescription images category location price rating duration");

    res.json({
      success: true,
      data: { destination, reviews, relatedDestinations },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDestinationBySlug = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const destination = await Destination.findOne({ slug: req.params.slug }).populate("createdBy", "name avatar");
    if (!destination) {
      res.status(404).json({ success: false, message: "Destination not found" });
      return;
    }

    const reviews = await Review.find({ destination: destination._id })
      .populate("user", "name avatar")
      .sort("-createdAt")
      .limit(10);

    res.json({
      success: true,
      data: { destination, reviews },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createDestination = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const destinationData = { ...req.body, createdBy: req.user?.id };
    const slug = req.body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const existing = await Destination.findOne({ slug });
    if (existing) {
      res.status(400).json({ success: false, message: "A destination with a similar name already exists" });
      return;
    }

    destinationData.slug = slug;
    const destination = await Destination.create(destinationData);

    res.status(201).json({ success: true, data: destination });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDestination = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      res.status(404).json({ success: false, message: "Destination not found" });
      return;
    }

    if (destination.createdBy.toString() !== req.user?.id && req.user?.role !== "admin") {
      res.status(403).json({ success: false, message: "Not authorized" });
      return;
    }

    const updated = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDestination = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      res.status(404).json({ success: false, message: "Destination not found" });
      return;
    }

    if (destination.createdBy.toString() !== req.user?.id && req.user?.role !== "admin") {
      res.status(403).json({ success: false, message: "Not authorized" });
      return;
    }

    await Destination.findByIdAndDelete(req.params.id);
    await Review.deleteMany({ destination: req.params.id });

    res.json({ success: true, message: "Destination deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeaturedDestinations = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const destinations = await Destination.find({ isFeatured: true })
      .sort("-rating")
      .limit(8)
      .select("title slug shortDescription images category location price rating duration reviewCount");

    res.json({ success: true, data: destinations });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyDestinations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const destinations = await Destination.find({ createdBy: req.user?.id }).sort("-createdAt");
    res.json({ success: true, data: destinations });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { rating, comment, pros, cons, travelDate } = req.body;
    const destinationId = req.params.id;

    const existingReview = await Review.findOne({ user: req.user?.id, destination: destinationId });
    if (existingReview) {
      res.status(400).json({ success: false, message: "You have already reviewed this destination" });
      return;
    }

    const review = await Review.create({
      user: req.user?.id,
      destination: destinationId,
      rating,
      comment,
      pros,
      cons,
      travelDate,
    });

    // Update destination rating
    const allReviews = await Review.find({ destination: destinationId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await Destination.findByIdAndUpdate(destinationId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: allReviews.length,
    });

    const populatedReview = await Review.findById(review._id).populate("user", "name avatar");

    res.status(201).json({ success: true, data: populatedReview });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
