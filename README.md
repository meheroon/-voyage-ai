# VoyageAI - AI-Powered Travel Planning Platform

A complete, production-ready Full Stack Agentic AI application that combines modern web technologies with Large Language Models to deliver intelligent travel planning, personalized recommendations, and AI-powered content generation.

## Live Demo

- **Frontend**: https://voyage-ai-sand.vercel.app
- **Backend API**: https://voyageai-server-wvw9.onrender.com/api

## Repository

- **GitHub**: https://github.com/meheroon/-voyage-ai

## Demo Credentials

- **Email**: demo@voyageai.com
- **Password**: demo123

Or use the **Demo Login** button on the login page.

---

## Technology Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript** (mandatory)
- **Tailwind CSS** (custom design system)
- **TanStack Query** (server state management)
- **Recharts** (data visualization)
- **Lucide React** (icons)
- **React Hot Toast** (notifications)
- **React Markdown** (AI content rendering)

### Backend
- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** (Mongoose ODM)
- **JWT Authentication** (Bearer tokens)
- **bcryptjs** (password hashing)
- **Zod** (validation)

### AI Integration
- **OpenAI GPT-4o** (primary LLM)

---

## Features Implemented

### 1. Landing Page (8 Sections)
- **Navbar** — Sticky, responsive, 5 routes logged in / 5 logged out, user profile dropdown
- **Hero Section** — 70% viewport height, gradient background, CTAs, floating UI cards
- **Features** — 6 AI-powered features grid
- **Popular Destinations** — 4 featured destination cards with skeleton loading
- **How It Works** — 3-step process illustration
- **Statistics** — 4 key metrics with icons
- **Testimonials** — Auto-rotating carousel with ratings
- **FAQ** — Accordion-style FAQ section
- **CTA** — Call-to-action section
- **Footer** — Full-width, working links, contact info, social icons

### 2. Core Listing / Card Section
- Each card: Image, Title, Description, Category tag, Price, Location, Duration, Rating, Review count, "View Details" button
- Same height, width, border radius, and layout
- Desktop: 4 cards per row
- Skeleton loaders during data fetching

### 3. Details Page
- Publicly accessible
- Multiple image gallery with image selector
- Description / Overview section
- Highlights section
- What's Included section
- Reviews / Ratings with review form
- Sidebar: Price, Duration, Difficulty, Seasons, Book Now, Save, Share
- Related Destinations

### 4. Listing / Explore Page
- Search bar with real-time search
- **Filtering**: Category tabs, Price range (min/max), Difficulty level
- **Sorting**: Newest, Price Low/High, Highest Rated, Most Reviewed
- **Pagination**: Numbered page buttons
- Results count display
- Clear all filters option

### 5. Authentication System
- Login page with email/password
- Registration page with name/email/password
- **Google Login** button (simulated)
- **Demo Login** button (auto-fill credentials)
- Password visibility toggle
- Proper validation and error handling
- Clean, split-screen professional UI
- JWT token management with localStorage

### 6. Protected Page: Add Items (/dashboard/items/add)
- Only accessible when logged in (redirects to /login)
- Form fields: Title, Short Description, Full Description, Category, Country, City, Region, Price, Duration, Difficulty, Image URLs, Highlights, Included, Seasons, Best For
- **AI Generate** button for description generation
- Submit and Cancel buttons

### 7. Protected Page: Manage Items (/dashboard/items/manage)
- Lists all user-created destinations
- Each row: Image placeholder, Title, Location, Rating, Price, Category
- Actions: View, Open in New Tab, Delete
- Empty state with CTA

### 8. Additional Pages
- **About** (/about) — Company story, mission, values, team, stats
- **Contact** (/contact) — Contact form, contact info, hours
- **Blog** (/blog) — Blog posts grid, featured post, category filters

### 9. AI Features (5 Implemented)

#### A. AI Chat Assistant (/dashboard/ai-chat)
- Conversational interface with conversation history
- Create / switch / delete conversations
- Suggested follow-up prompts
- Typing indicator ("Thinking...")
- Message history per conversation
- Sidebar with conversation list
- Mobile-responsive sidebar toggle

#### B. AI Trip Planner (/dashboard/ai-planner)
- Input: Destination, Start/End dates, Budget, Travelers, Preferences
- Generates complete day-by-day itinerary with activities, restaurants, tips
- Download as Markdown file
- Real-time generation with loading state

#### C. AI Content Generator (/dashboard/ai-generator)
- Content types: Blog Post, Travel Guide, Destination Review, Packing List, Social Media Post, Email Newsletter
- Adjustable length: Short, Medium, Long
- Tone selection: Informative, Casual, Professional, Enthusiastic, Luxurious
- Regenerate response
- Download as Markdown
- Generation history

#### D. AI Recommendations (/dashboard/ai-recommendations)
- Context-aware recommendations based on user preferences
- Shows preferences being used (interests, budget, travel style)
- Refresh button for new recommendations

#### E. AI Data Analyzer (/dashboard/ai-analyzer)
- Text input for structured/unstructured travel data
- Sample data loader
- AI-generated analytical report with trends, insights, recommendations

### 10. Dashboard
- Welcome message with user's first name
- Stats cards: Destinations, Conversations, Reviews, Countries
- Quick action cards for AI tools
- Bar chart (Travel Activity)
- Pie chart (Destination Categories)
- Recent destinations list

---

## Project Structure

```
voyage-ai/
├── client/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/        # Auth pages (login, register)
│   │   │   ├── (main)/        # Public pages (explore, detail, about, etc.)
│   │   │   ├── dashboard/     # Protected dashboard pages
│   │   │   ├── layout.tsx     # Root layout
│   │   │   ├── page.tsx       # Landing page
│   │   │   └── globals.css    # Global styles
│   │   ├── components/        # Reusable components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # API client, utilities
│   │   ├── providers/         # Auth & Query providers
│   │   └── types/             # TypeScript types
│   └── package.json
│
├── server/                    # Express.js Backend
│   ├── src/
│   │   ├── config/            # Database, environment
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Auth middleware
│   │   ├── models/            # MongoDB models
│   │   ├── routes/            # API routes
│   │   ├── services/          # AI service (OpenAI)
│   │   ├── types/             # TypeScript types
│   │   └── utils/             # Seed data, helpers
│   └── package.json
│
└── README.md
```

---

## Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- OpenAI API key

### Backend Setup
```bash
cd server
npm install
# Configure .env file with your MongoDB URI and OpenAI API key
npm run dev          # Start development server
npm run seed         # Seed database with sample destinations
```

### Frontend Setup
```bash
cd client
npm install
npm run dev          # Start development server on port 3000
```

### Environment Variables

**Server (.env)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/voyageai
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLIENT_ID=your_google_client_id
CLIENT_URL=http://localhost:3000
```

**Client (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## API Endpoints

### Auth
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login
- `POST /api/auth/google` — Google OAuth login
- `GET /api/auth/me` — Get current user (protected)
- `PUT /api/auth/profile` — Update profile (protected)

### Destinations
- `GET /api/destinations` — List with filtering, sorting, pagination
- `GET /api/destinations/featured` — Featured destinations
- `GET /api/destinations/my` — User's destinations (protected)
- `GET /api/destinations/:id` — Get by ID with reviews and related
- `POST /api/destinations` — Create (protected)
- `PUT /api/destinations/:id` — Update (protected)
- `DELETE /api/destinations/:id` — Delete (protected)
- `POST /api/destinations/:id/reviews` — Add review (protected)

### Chat
- `GET /api/chat/conversations` — List conversations (protected)
- `POST /api/chat/conversations` — Create conversation (protected)
- `GET /api/chat/conversations/:id` — Get conversation (protected)
- `DELETE /api/chat/conversations/:id` — Delete conversation (protected)
- `POST /api/chat/send` — Send message (protected)

### AI
- `POST /api/ai/itinerary` — Generate trip itinerary (protected)
- `GET /api/ai/itineraries` — List itineraries (protected)
- `POST /api/ai/generate` — Generate content (protected)
- `POST /api/ai/recommendations` — Get AI recommendations (protected)
- `POST /api/ai/analyze` — Analyze travel data (protected)
- `POST /api/ai/description` — Generate destination description (protected)

---

## Design System

### Colors (3 Primary + Neutral)
- **Primary**: Blue (#0ea5e9) — Trust, exploration
- **Accent**: Orange (#f97316) — Energy, adventure
- **Navy**: Slate (#0f172a) — Professional, depth
- **Neutral**: White/Gray backgrounds

### Components
- Consistent border radius (rounded-xl for cards, rounded-lg for buttons/inputs)
- Consistent spacing (p-5 for cards, gap-6 for grids)
- Skeleton loaders for all data-dependent sections
- Responsive: Mobile-first with sm/lg breakpoints

---

## Requirements Checklist

| # | Requirement | Status |
|---|-------------|--------|
| 1 | Tech Stack (Next.js, TS, Tailwind, TanStack, Recharts, Express, MongoDB, JWT) | ✅ |
| 2 | UI Design Rules (3 colors, consistent, responsive) | ✅ |
| 3 | Landing Page (8 sections, navbar, hero, footer) | ✅ |
| 4 | Core Listing Cards (image, title, desc, meta, view details, skeleton) | ✅ |
| 5 | Details Page (public, images, description, reviews, related) | ✅ |
| 6 | Explore Page (search, filters, sorting, pagination) | ✅ |
| 7 | Auth System (login, register, demo, Google, validation) | ✅ |
| 8 | Protected Add Items Page | ✅ |
| 9 | Protected Manage Items Page | ✅ |
| 10 | Additional Pages (About, Contact, Blog) | ✅ |
| 11 | AI Features (Chat, Trip Planner, Content Gen, Recommendations, Data Analyzer) | ✅ |
| 12 | UX & Responsiveness (no lorem ipsum, fully responsive, clickable) | ✅ |
