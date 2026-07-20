import mongoose from "mongoose";
import dotenv from "dotenv";
import Destination from "../models/Destination";
import User from "../models/User";
import destinations from "../data/destinations";

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/voyageai");
    console.log("Connected to MongoDB");

    // Create a default admin user
    let adminUser = await User.findOne({ email: "admin@voyageai.com" });
    if (!adminUser) {
      adminUser = await User.create({
        name: "VoyageAI Admin",
        email: "admin@voyageai.com",
        password: "admin123",
        role: "admin",
        avatar: "",
      });
      console.log("Admin user created");
    }

    // Create demo user
    let demoUser = await User.findOne({ email: "demo@voyageai.com" });
    if (!demoUser) {
      demoUser = await User.create({
        name: "Demo Traveler",
        email: "demo@voyageai.com",
        password: "demo123",
        role: "user",
        preferences: {
          budget: "moderate",
          travelStyle: "adventure",
          interests: ["culture", "nature", "food"],
        },
      });
      console.log("Demo user created");
    }

    // Seed destinations
    const existingCount = await Destination.countDocuments();
    if (existingCount === 0) {
      const seededDestinations = destinations.map((d) => ({
        ...d,
        createdBy: adminUser._id,
      }));
      await Destination.insertMany(seededDestinations);
      console.log(`${destinations.length} destinations seeded`);
    } else {
      console.log(`${existingCount} destinations already exist`);
    }

    console.log("Database seeded successfully!");
    console.log("Demo credentials: demo@voyageai.com / demo123");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
