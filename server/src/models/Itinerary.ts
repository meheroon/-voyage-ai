import mongoose, { Schema, Document } from "mongoose";

export interface IItineraryDocument extends Document {
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
}

const itinerarySchema = new Schema<IItineraryDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, required: true },
    travelers: { type: Number, default: 1 },
    preferences: [{ type: String }],
    itinerary: [
      {
        day: { type: Number, required: true },
        date: { type: Date, required: true },
        activities: [
          {
            time: { type: String, required: true },
            activity: { type: String, required: true },
            location: { type: String, default: "" },
            notes: { type: String, default: "" },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IItineraryDocument>("Itinerary", itinerarySchema);
