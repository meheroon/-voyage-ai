import mongoose, { Schema, Document } from "mongoose";

export interface IDestinationDocument extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
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
  difficulty: string;
  season: string[];
  bestFor: string[];
  isFeatured: boolean;
  createdBy: mongoose.Types.ObjectId;
}

const destinationSchema = new Schema<IDestinationDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    images: [{ type: String }],
    category: {
      type: String,
      required: true,
      enum: ["beach", "mountain", "city", "cultural", "adventure", "luxury", "budget"],
    },
    location: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      region: { type: String, default: "" },
    },
    price: { type: Number, required: true, min: 0 },
    duration: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    highlights: [{ type: String }],
    included: [{ type: String }],
    difficulty: { type: String, enum: ["easy", "moderate", "challenging"], default: "moderate" },
    season: [{ type: String }],
    bestFor: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

destinationSchema.index({ title: "text", description: "text", "location.city": "text", "location.country": "text" });
destinationSchema.index({ category: 1, price: 1, rating: -1 });

export default mongoose.model<IDestinationDocument>("Destination", destinationSchema);
