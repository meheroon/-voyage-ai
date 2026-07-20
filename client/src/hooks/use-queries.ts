import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { destinationAPI, chatAPI, aiAPI } from "@/lib/api";

// Query key factories
export const keys = {
  destinations: {
    all: ["destinations"] as const,
    list: (params: Record<string, string>) => ["destinations", "list", params] as const,
    featured: ["destinations", "featured"] as const,
    detail: (id: string) => ["destinations", "detail", id] as const,
    mine: ["destinations", "mine"] as const,
  },
  conversations: {
    all: ["conversations"] as const,
    detail: (id: string) => ["conversations", id] as const,
    messages: (id: string) => ["conversations", id, "messages"] as const,
  },
  ai: {
    recommendations: ["ai", "recommendations"] as const,
    itineraries: ["ai", "itineraries"] as const,
  },
};

// Destination queries
export function useDestinations(params: Record<string, string>) {
  return useQuery({
    queryKey: keys.destinations.list(params),
    queryFn: () => destinationAPI.getAll(params),
    select: (res) => ({ data: res.data.data, pagination: res.data.pagination }),
  });
}

export function useFeaturedDestinations() {
  return useQuery({
    queryKey: keys.destinations.featured,
    queryFn: () => destinationAPI.getFeatured(),
    select: (res) => res.data.data,
  });
}

export function useDestination(id: string) {
  return useQuery({
    queryKey: keys.destinations.detail(id),
    queryFn: () => destinationAPI.getById(id),
    select: (res) => ({
      destination: res.data.data.destination,
      reviews: res.data.data.reviews,
      relatedDestinations: res.data.data.relatedDestinations,
    }),
    enabled: !!id,
  });
}

export function useMyDestinations() {
  return useQuery({
    queryKey: keys.destinations.mine,
    queryFn: () => destinationAPI.getMy(),
    select: (res) => res.data.data,
  });
}

export function useCreateDestination() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => destinationAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.destinations.mine });
      qc.invalidateQueries({ queryKey: keys.destinations.all });
    },
  });
}

export function useDeleteDestination() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => destinationAPI.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.destinations.mine });
      qc.invalidateQueries({ queryKey: keys.destinations.all });
    },
  });
}

export function useAddReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => destinationAPI.addReview(id, data),
    onSuccess: (_res, variables) => {
      qc.invalidateQueries({ queryKey: keys.destinations.detail(variables.id) });
    },
  });
}

// Conversation queries
export function useConversations() {
  return useQuery({
    queryKey: keys.conversations.all,
    queryFn: () => chatAPI.getConversations(),
    select: (res) => res.data.data,
  });
}

export function useConversation(id: string) {
  return useQuery({
    queryKey: keys.conversations.messages(id),
    queryFn: () => chatAPI.getConversation(id),
    select: (res) => res.data.data.messages,
    enabled: !!id,
  });
}

export function useCreateConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data?: { title?: string }) => chatAPI.createConversation(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.conversations.all });
    },
  });
}

export function useSendMessage() {
  return useMutation({
    mutationFn: (data: { conversationId: string; message: string }) => chatAPI.sendMessage(data),
  });
}

export function useDeleteConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => chatAPI.deleteConversation(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.conversations.all });
    },
  });
}

// AI queries
export function useAIRecommendations() {
  return useQuery({
    queryKey: keys.ai.recommendations,
    queryFn: () => aiAPI.getRecommendations(),
    select: (res) => ({
      recommendations: res.data.data.recommendations,
      basedOn: res.data.data.basedOn,
    }),
    retry: 1,
  });
}

export function useGenerateItinerary() {
  return useMutation({
    mutationFn: (data: any) => aiAPI.createItinerary(data),
  });
}

export function useGenerateContent() {
  return useMutation({
    mutationFn: (data: { type: string; topic: string; length: string; tone: string }) =>
      aiAPI.generateContent(data),
  });
}

export function useAnalyzeData() {
  return useMutation({
    mutationFn: (data: { data: string }) => aiAPI.analyzeData(data),
  });
}

export function useGenerateDescription() {
  return useMutation({
    mutationFn: (data: any) => aiAPI.generateDescription(data),
  });
}
