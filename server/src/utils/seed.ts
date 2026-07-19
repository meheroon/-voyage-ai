import mongoose from "mongoose";
import dotenv from "dotenv";
import Destination from "../models/Destination";
import User from "../models/User";

dotenv.config();

const destinations = [
  {
    title: "Santorini Sunset Retreat",
    slug: "santorini-sunset-retreat",
    description: "Experience the magic of Santorini, where whitewashed villages cascade down volcanic cliffs overlooking the deep blue Aegean Sea. This iconic Greek island offers world-famous sunsets from Oia, ancient ruins at Akrotiri, and pristine beaches with dramatic red and black sand. Wander through narrow cobblestone streets adorned with bougainvillea, savor fresh Mediterranean cuisine at cliffside tavernas, and discover hidden wineries producing exquisite Assyrtiko wines. From boat tours to the volcanic caldera to relaxing in luxury cave hotels, Santorini promises an unforgettable escape.",
    shortDescription: "Iconic Greek island with breathtaking sunsets, volcanic beaches, and charming whitewashed villages perched on dramatic cliffs.",
    images: [
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
    ],
    category: "luxury",
    location: { country: "Greece", city: "Santorini", region: "Cyclades" },
    price: 2500,
    duration: "7 days",
    rating: 4.9,
    reviewCount: 342,
    highlights: ["Oia Sunset", "Caldera Boat Tour", "Wine Tasting", "Red Beach", "Akrotiri Ruins"],
    included: ["Accommodation", "Airport Transfer", "Guided Tours", "Wine Tour"],
    difficulty: "easy",
    season: ["spring", "summer", "fall"],
    bestFor: ["couples", "photography", "luxury"],
    isFeatured: true,
  },
  {
    title: "Bali Tropical Paradise",
    slug: "bali-tropical-paradise",
    description: "Discover the Island of the Gods, where ancient temples emerge from misty rice terraces and sacred monkey forests. Bali enchants visitors with its unique blend of Hindu culture, stunning natural beauty, and warm hospitality. Surf world-class waves in Uluwatu, find spiritual awakening in Ubud's yoga retreats, and dive into vibrant coral reefs off Nusa Penida. From the dramatic sunrise trek up Mount Batur to the enchanting Kecak fire dance performances, every moment in Bali is infused with wonder and tranquility.",
    shortDescription: "The Island of the Gods — ancient temples, emerald rice terraces, world-class surfing, and spiritual retreats in Indonesia.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800",
    ],
    category: "cultural",
    location: { country: "Indonesia", city: "Bali", region: "Lesser Sunda Islands" },
    price: 1800,
    duration: "10 days",
    rating: 4.8,
    reviewCount: 567,
    highlights: ["Ubud Rice Terraces", "Temple Tours", "Mount Batur Sunrise", "Surfing in Uluwatu", "Traditional Dance"],
    included: ["Accommodation", "Daily Breakfast", "Temple Tours", "Airport Transfer"],
    difficulty: "moderate",
    season: ["spring", "summer"],
    bestFor: ["culture", "adventure", "wellness"],
    isFeatured: true,
  },
  {
    title: "Swiss Alps Adventure",
    slug: "swiss-alps-adventure",
    description: "Embark on an exhilarating journey through the majestic Swiss Alps, where snow-capped peaks pierce crystal-clear skies and emerald valleys hide charming villages. Ride the legendary Glacier Express through breathtaking mountain passes, hike the legendary Eiger Trail with views of the iconic north face, and paraglide over the pristine waters of Lake Interlaken. Indulge in authentic Swiss chocolate, cheese fondue, and raclette while cozying up in traditional mountain chalets. Whether skiing in Zermatt with the Matterhorn as your backdrop or taking the cogwheel train to Jungfraujoch, the Top of Europe, this adventure delivers unforgettable alpine experiences.",
    shortDescription: "Majestic mountain landscapes, world-class skiing, scenic train rides, and authentic Swiss chalet experiences.",
    images: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800",
    ],
    category: "adventure",
    location: { country: "Switzerland", city: "Interlaken", region: "Bernese Oberland" },
    price: 3200,
    duration: "8 days",
    rating: 4.9,
    reviewCount: 289,
    highlights: ["Glacier Express", "Jungfraujoch", "Paragliding", "Hiking", "Swiss Chocolate Tour"],
    included: ["Train Pass", "Accommodation", "Mountain Guide", "Equipment Rental"],
    difficulty: "challenging",
    season: ["winter", "summer"],
    bestFor: ["adventure", "nature", "winter sports"],
    isFeatured: true,
  },
  {
    title: "Tokyo Cultural Immersion",
    slug: "tokyo-cultural-immersion",
    description: "Step into the electrifying world of Tokyo, where ancient tradition meets cutting-edge innovation at every corner. Explore the serene Meiji Shrine surrounded by a lush forest in the heart of the city, then dive into the neon-lit streets of Shibuya and Shinjuku. Savor the freshest sushi at Tsukiji Outer Market, witness the precision of a traditional tea ceremony, and find tranquility in the rock gardens of Ryoan-ji. From the immersive digital art of teamLab to the colorful shops of Harajuku, Tokyo offers a sensory feast that captures both the ancient soul and futuristic spirit of Japan.",
    shortDescription: "Where ancient tradition meets futuristic innovation — temples, tech, cuisine, and pop culture in Japan's vibrant capital.",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
    ],
    category: "city",
    location: { country: "Japan", city: "Tokyo", region: "Kanto" },
    price: 2200,
    duration: "6 days",
    rating: 4.8,
    reviewCount: 423,
    highlights: ["Shibuya Crossing", "Meiji Shrine", "Tsukiji Market", "teamLab", "Mt. Fuji Day Trip"],
    included: ["Accommodation", "Metro Pass", "Guided Food Tour", "Temple Visit"],
    difficulty: "easy",
    season: ["spring", "fall"],
    bestFor: ["culture", "food", "photography"],
    isFeatured: true,
  },
  {
    title: "Maldives Ocean Escape",
    slug: "maldives-ocean-escape",
    description: "Surrender to the ultimate tropical luxury in the Maldives, a paradise of private overwater villas perched above impossibly turquoise lagoons. Wake up to the sight of manta rays gliding beneath your glass floor, snorkel through vibrant coral gardens teeming with tropical fish, and dine on freshly caught seafood under a canopy of stars. The Maldives offers unparalleled seclusion, from private sandbank picnics to sunset dolphin cruises. Indulge in world-class spa treatments, practice yoga overlooking the endless Indian Ocean, and discover bioluminescent beaches that glow with ethereal blue light at night.",
    shortDescription: "Ultimate luxury escape with overwater villas, crystal-clear waters, vibrant marine life, and pristine white sand beaches.",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a3934d?w=800",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
    ],
    category: "beach",
    location: { country: "Maldives", city: "Malé Atoll", region: "North Malé Atoll" },
    price: 4500,
    duration: "5 days",
    rating: 4.9,
    reviewCount: 198,
    highlights: ["Overwater Villa", "Snorkeling", "Dolphin Cruise", "Spa Retreat", "Bioluminescent Beach"],
    included: ["Overwater Villa", "All Meals", "Snorkeling Equipment", "Speedboat Transfer"],
    difficulty: "easy",
    season: ["winter", "spring"],
    bestFor: ["couples", "luxury", "honeymoon"],
    isFeatured: true,
  },
  {
    title: "Machu Picchu Explorer",
    slug: "machu-picchu-explorer",
    description: "Trace the footsteps of the ancient Incas on an unforgettable journey to Machu Picchu, the crown jewel of South American archaeology. Trek the legendary Inca Trail through cloud forests and past forgotten ruins, arriving at the Sun Gate for a dawn reveal of the extraordinary citadel perched between mountain peaks. Explore the Sacred Valley, visit the vibrant markets of Pisac, and marvel at the massive stone fortress of Ollantaytambo. This adventure combines breathtaking natural beauty with profound cultural heritage, offering experiences that transform your understanding of human achievement and the power of the Andean landscape.",
    shortDescription: "Follow the ancient Inca Trail to the legendary lost citadel nestled high in the Peruvian Andes.",
    images: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800",
      "https://images.unsplash.com/photo-1587595431973-160d0d8410f3?w=800",
    ],
    category: "adventure",
    location: { country: "Peru", city: "Cusco", region: "Sacred Valley" },
    price: 2000,
    duration: "7 days",
    rating: 4.7,
    reviewCount: 312,
    highlights: ["Inca Trail Trek", "Machu Picchu Sunrise", "Sacred Valley", "Local Markets", "Cloud Forest"],
    included: ["Guide", "Camping Equipment", "Meals on Trail", "Entrance Fees", "Train Return"],
    difficulty: "challenging",
    season: ["spring", "fall"],
    bestFor: ["adventure", "history", "nature"],
    isFeatured: true,
  },
  {
    title: "Paris Romantic Getaway",
    slug: "paris-romantic-getaway",
    description: "Fall in love all over again in the City of Light, where every cobblestone street tells a story and every corner reveals a masterpiece. Stroll along the Seine as the Eiffel Tower sparkles at night, explore the world's greatest art museums from the Louvre to the Musée d'Orsay, and lose yourself in the bohemian charm of Montmartre. Indulge in flaky croissants at sidewalk cafés, discover hidden wine bars in the Marais, and watch the sunset from the steps of Sacré-Cœur. Paris is not just a destination — it is a feeling, an eternal romance with beauty, art, and the art of living well.",
    shortDescription: "The eternal city of love — world-class art, exquisite cuisine, and timeless romance on the banks of the Seine.",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
    ],
    category: "city",
    location: { country: "France", city: "Paris", region: "Île-de-France" },
    price: 2100,
    duration: "5 days",
    rating: 4.7,
    reviewCount: 478,
    highlights: ["Eiffel Tower", "Louvre Museum", "Montmartre", "Seine River Cruise", "French Cuisine Tour"],
    included: ["Boutique Hotel", "Museum Pass", "River Cruise", "Food Tour"],
    difficulty: "easy",
    season: ["spring", "fall"],
    bestFor: ["couples", "culture", "photography"],
    isFeatured: true,
  },
  {
    title: "Iceland Ring Road Expedition",
    slug: "iceland-ring-road-expedition",
    description: "Circle the land of fire and ice on an epic road trip along Iceland's legendary Ring Road, where every mile reveals landscapes that seem plucked from another planet. Chase the northern lights dancing across Arctic skies, stand behind the thundering curtain of Seljalandsfoss waterfall, and soak in the geothermal waters of the Blue Lagoon. Drive through the otherworldly Jökulsárlón glacier lagoon where icebergs float like diamonds, hike across vast lava fields, and witness erupting geysers in the golden light of midnight sun. Iceland's raw, untamed beauty makes it one of Earth's most extraordinary destinations.",
    shortDescription: "Circle the land of fire and ice — glaciers, waterfalls, geysers, and the magical northern lights.",
    images: [
      "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800",
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800",
    ],
    category: "adventure",
    location: { country: "Iceland", city: "Reykjavik", region: "Golden Circle" },
    price: 2800,
    duration: "10 days",
    rating: 4.8,
    reviewCount: 256,
    highlights: ["Northern Lights", "Blue Lagoon", "Golden Circle", "Glacier Hike", "Jökulsárlón Lagoon"],
    included: ["4x4 Vehicle Rental", "Accommodation", "Glacier Guide", "Blue Lagoon Entry"],
    difficulty: "moderate",
    season: ["winter", "summer"],
    bestFor: ["adventure", "nature", "photography"],
    isFeatured: true,
  },
  {
    title: "Marrakech Desert Discovery",
    slug: "marrakech-desert-discovery",
    description: "Immerse yourself in the intoxicating sensory world of Marrakech, where ancient medinas bustle with life and the Sahara Desert stretches to the horizon. Lose yourself in the labyrinthine souks of the medina, haggling for handcrafted leather goods, aromatic spices, and intricate Berber carpets. Experience the magic of a camel trek into the Erg Chebbi dunes, sleeping under a canopy of stars in a luxury desert camp. From the ornate palaces and gardens of the city to the vast silence of the Sahara, Morocco offers a journey that awakens every sense and stirs the soul.",
    shortDescription: "Vibrant souks, ancient medinas, luxury desert camps, and the vast golden dunes of the Sahara.",
    images: [
      "https://images.unsplash.com/photo-1517821099606-cef63cd97448?w=800",
      "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800",
    ],
    category: "cultural",
    location: { country: "Morocco", city: "Marrakech", region: "Marrakech-Safi" },
    price: 1500,
    duration: "6 days",
    rating: 4.6,
    reviewCount: 189,
    highlights: ["Medina Souks", "Sahara Desert Camp", "Camel Trek", "Bahia Palace", "Cooking Class"],
    included: ["Riad Stay", "Desert Camp", "Camel Trek", "Guided Tours", "Cooking Class"],
    difficulty: "moderate",
    season: ["spring", "fall"],
    bestFor: ["culture", "adventure", "food"],
    isFeatured: true,
  },
  {
    title: "Costa Rica Eco Adventure",
    slug: "costa-rica-eco-adventure",
    description: "Dive into the biodiverse wonderland of Costa Rica, a small nation that packs an extraordinary punch of natural beauty and adventure. Zip-line through the canopy of Monteverde Cloud Forest, surf the Pacific breaks of Tamarindo, and hike the volcanic trails of Arenal where hot springs steam beside rushing rivers. Spot scarlet macaws, howler monkeys, and sloths in their natural habitats, kayak through mangrove estuaries, and white-water raft through pristine gorges. Costa Rica's commitment to sustainability and its pura vida spirit make it the ultimate destination for eco-conscious travelers seeking authentic adventure.",
    shortDescription: "Biodiverse paradise with cloud forests, volcanoes, wildlife, and sustainable eco-adventures.",
    images: [
      "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=800",
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800",
    ],
    category: "adventure",
    location: { country: "Costa Rica", city: "La Fortuna", region: "Arenal" },
    price: 1700,
    duration: "8 days",
    rating: 4.7,
    reviewCount: 234,
    highlights: ["Cloud Forest Zip-line", "Arenal Volcano", "Wildlife Spotting", "Surfing", "Hot Springs"],
    included: ["Eco Lodge", "Tours", "Equipment", "Transport"],
    difficulty: "moderate",
    season: ["winter", "spring"],
    bestFor: ["adventure", "nature", "families"],
    isFeatured: false,
  },
  {
    title: "Dubai Luxury Experience",
    slug: "dubai-luxury-experience",
    description: "Experience the pinnacle of luxury and innovation in Dubai, a city that defies imagination with its architectural marvels and opulent lifestyle. Ascend the Burj Khalifa to the world's highest observation point, shop in the gold and spice souks, and dune bash across the desert in a luxury 4x4. Indulge in Michelin-starred dining, relax on pristine Jumeirah Beach, and explore the futuristic Museum of the Future. From the traditional abra ride across Dubai Creek to the spectacular fountain shows at Dubai Mall, this city seamlessly blends Arabian heritage with bold futuristic vision.",
    shortDescription: "Ultra-modern luxury, architectural marvels, desert adventures, and world-class dining in the UAE.",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
    ],
    category: "luxury",
    location: { country: "UAE", city: "Dubai", region: "Emirate of Dubai" },
    price: 3500,
    duration: "5 days",
    rating: 4.6,
    reviewCount: 312,
    highlights: ["Burj Khalifa", "Desert Safari", "Gold Souk", "Luxury Shopping", "Fountain Show"],
    included: ["5-Star Hotel", "Airport Transfer", "Desert Safari", "Burj Khalifa Ticket"],
    difficulty: "easy",
    season: ["winter", "spring"],
    bestFor: ["luxury", "shopping", "families"],
    isFeatured: false,
  },
  {
    title: "Vietnam Budget Discovery",
    slug: "vietnam-budget-discovery",
    description: "Explore the incredible diversity of Vietnam on a budget-friendly adventure that proves the best experiences don't need to cost a fortune. Cruise through the emerald waters of Ha Long Bay aboard a traditional junk boat, wander the lantern-lit streets of Hoi An's ancient town, and trek through the terraced rice paddies of Sapa. Taste your way through Vietnam's legendary street food scene — from steaming bowls of pho in Hanoi to crispy banh mi in Ho Chi Minh City. With its rich history, warm people, and astonishing landscapes, Vietnam delivers extraordinary value and unforgettable memories.",
    shortDescription: "Incredible value adventure — Ha Long Bay, street food paradise, ancient towns, and stunning landscapes on a budget.",
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1557750255-c7607237c798?w=800",
    ],
    category: "budget",
    location: { country: "Vietnam", city: "Hanoi", region: "Northern Vietnam" },
    price: 900,
    duration: "12 days",
    rating: 4.7,
    reviewCount: 445,
    highlights: ["Ha Long Bay Cruise", "Hoi An Ancient Town", "Sapa Trekking", "Street Food Tour", "Cu Chi Tunnels"],
    included: ["Hostel/Budget Hotel", "Domestic Flights", "Guided Tours", "Meals"],
    difficulty: "moderate",
    season: ["spring", "fall"],
    bestFor: ["budget", "adventure", "food"],
    isFeatured: false,
  },
];

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
