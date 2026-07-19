import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || "5000", 10),
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/voyageai",
  JWT_SECRET: process.env.JWT_SECRET || "voyageai_default_secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
};
