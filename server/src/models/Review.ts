import mongoose, { Schema, Document } from "mongoose";

export interface IReviewDocument extends Document {
  user: mongoose.Types.ObjectId;
  destination: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  pros: string[];
  cons: string[];
  travelDate: Date;
}

const reviewSchema = new Schema<IReviewDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    destination: { type: Schema.Types.ObjectId, ref: "Destination", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    pros: [{ type: String }],
    cons: [{ type: String }],
    travelDate: { type: Date },
  },
  { timestamps: true }
);

reviewSchema.index({ destination: 1, user: 1 }, { unique: true });

export default mongoose.model<IReviewDocument>("Review", reviewSchema);
