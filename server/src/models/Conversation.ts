import mongoose, { Schema, Document } from "mongoose";

export interface IConversationDocument extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  messages: {
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: Date;
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversationDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, default: "New Conversation" },
    messages: [
      {
        role: { type: String, enum: ["user", "assistant", "system"], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IConversationDocument>("Conversation", conversationSchema);
