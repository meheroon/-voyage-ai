export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  preferences?: {
    budget: string;
    travelStyle: string;
    interests: string[];
  };
}

export interface Destination {
  _id: string;
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
  createdBy: { _id: string; name: string; avatar: string };
  createdAt: string;
}

export interface Review {
  _id: string;
  user: { _id: string; name: string; avatar: string };
  destination: string;
  rating: number;
  comment: string;
  pros: string[];
  cons: string[];
  travelDate: string;
  createdAt: string;
}

export interface Conversation {
  _id: string;
  title: string;
  lastMessage: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface Itinerary {
  _id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelers: number;
  preferences: string[];
  createdAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
