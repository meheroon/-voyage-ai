import axios from "axios";

const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_URL = RAW_API_URL.endsWith("/api") ? RAW_API_URL : `${RAW_API_URL.replace(/\/+$/, "")}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("voyageai_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("voyageai_token");
        localStorage.removeItem("voyageai_user");
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  login: (data: { email: string; password: string }) => api.post("/auth/login", data),
  register: (data: { name: string; email: string; password: string }) => api.post("/auth/register", data),
  googleLogin: (data: { name: string; email: string; avatar: string; googleId: string }) =>
    api.post("/auth/google", data),
  getMe: () => api.get("/auth/me"),
  updateProfile: (data: any) => api.put("/auth/profile", data),
};

// Destinations
export const destinationAPI = {
  getAll: (params?: Record<string, string>) => api.get("/destinations", { params }),
  getById: (id: string) => api.get(`/destinations/${id}`),
  getFeatured: () => api.get("/destinations/featured"),
  getMy: () => api.get("/destinations/my"),
  create: (data: any) => api.post("/destinations", data),
  update: (id: string, data: any) => api.put(`/destinations/${id}`, data),
  delete: (id: string) => api.delete(`/destinations/${id}`),
  addReview: (id: string, data: any) => api.post(`/destinations/${id}/reviews`, data),
};

// Chat
export const chatAPI = {
  getConversations: () => api.get("/chat/conversations"),
  getConversation: (id: string) => api.get(`/chat/conversations/${id}`),
  createConversation: (data?: { title?: string }) => api.post("/chat/conversations", data),
  sendMessage: (data: { conversationId: string; message: string }) => api.post("/chat/send", data),
  deleteConversation: (id: string) => api.delete(`/chat/conversations/${id}`),
};

// AI
export const aiAPI = {
  createItinerary: (data: any) => api.post("/ai/itinerary", data),
  getItineraries: () => api.get("/ai/itineraries"),
  generateContent: (data: { type: string; topic: string; length: string; tone: string }) =>
    api.post("/ai/generate", data),
  getRecommendations: () => api.post("/ai/recommendations"),
  analyzeData: (data: { data: string }) => api.post("/ai/analyze", data),
  generateDescription: (data: any) => api.post("/ai/description", data),
};

export default api;
