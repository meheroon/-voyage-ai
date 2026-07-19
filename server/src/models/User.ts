import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  avatar: string;
  provider: "local" | "google";
  role: "user" | "admin";
  preferences: {
    budget: string;
    travelStyle: string;
    interests: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    avatar: { type: String, default: "" },
    provider: { type: String, enum: ["local", "google"], default: "local" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    preferences: {
      budget: { type: String, default: "moderate" },
      travelStyle: { type: String, default: "balanced" },
      interests: [{ type: String }],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUserDocument>("User", userSchema);
