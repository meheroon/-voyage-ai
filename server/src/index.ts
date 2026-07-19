import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import User from "./models/User";
import authRoutes from "./routes/auth.routes";
import destinationRoutes from "./routes/destination.routes";
import chatRoutes from "./routes/chat.routes";
import aiRoutes from "./routes/ai.routes";

dotenv.config();

const ensureDemoUsers = async () => {
  const demoAccounts = [
    {
      email: "demo@voyageai.com",
      name: "Demo Traveler",
      password: "demo123",
      role: "user" as const,
      preferences: {
        budget: "moderate",
        travelStyle: "adventure",
        interests: ["culture", "nature", "food"],
      },
    },
    {
      email: "admin@voyageai.com",
      name: "VoyageAI Admin",
      password: "admin123",
      role: "admin" as const,
      avatar: "",
    },
  ];

  for (const acct of demoAccounts) {
    const existing = await User.findOne({ email: acct.email });
    if (!existing) {
      await User.create(acct);
      console.log(`Auto-seeded ${acct.role} user: ${acct.email}`);
    }
  }
};

const app = express();
const PORT = process.env.PORT || 5000;

// Normalize allowed origins by trimming trailing slashes and supporting comma-separated list
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000")
  .split(",")
  .map((url) => url.trim().replace(/\/+$/, ""));

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., Postman, server-to-server)
      if (!origin) return callback(null, true);
      const normalizedOrigin = origin.replace(/\/+$/, "");
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/ai", aiRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), service: "VoyageAI Server" });
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Server Error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// Start server
const start = async () => {
  await connectDB();
  await ensureDemoUsers();
  app.listen(PORT, () => {
    console.log(`VoyageAI Server running on port ${PORT}`);
  });
};

start();
