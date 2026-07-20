"use client";

import { useState } from "react";
import { useAIRecommendations } from "@/hooks/use-queries";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { Target, Loader2, RefreshCw, AlertTriangle, SlidersHorizontal } from "lucide-react";

export default function AIRecommendationsPage() {
  const { data, isLoading: loading, error, refetch } = useAIRecommendations();
  const result = data?.recommendations ?? "";
  const basedOn = data?.basedOn ?? null;
  const apiError = error ? (error as any)?.response?.data?.message || "Failed to get recommendations" : "";

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">AI Recommendations</h1>
          <p className="text-navy-500">Personalized destination suggestions based on your preferences.</p>
        </div>
        <button onClick={() => refetch()} disabled={loading} className="btn-primary">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {basedOn?.preferences && (
        <div className="mb-6 card p-4">
          <div className="flex items-center gap-2 mb-2">
            <SlidersHorizontal className="h-4 w-4 text-navy-500" />
            <p className="text-sm font-medium text-navy-500">Based on your preferences:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {basedOn.preferences.interests?.map((interest: string, i: number) => (
              <span key={i} className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 capitalize">
                {interest}
              </span>
            ))}
            <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-700 capitalize">
              {basedOn.preferences.budget} budget
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 capitalize">
              {basedOn.preferences.travelStyle} style
            </span>
          </div>
        </div>
      )}

      <div className="card min-h-[400px] p-6">
        {loading ? (
          <div className="flex h-full min-h-[300px] items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-primary-500" />
              <p className="text-navy-500">Analyzing your preferences...</p>
            </div>
          </div>
        ) : apiError ? (
          <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
            <AlertTriangle className="mb-4 h-12 w-12 text-amber-400" />
            <p className="mb-2 font-medium text-navy-700">AI Features Unavailable</p>
            <p className="max-w-md text-sm text-navy-500">{apiError}</p>
            <button onClick={() => refetch()} className="btn-primary mt-4">
              <RefreshCw className="h-4 w-4" /> Try Again
            </button>
          </div>
        ) : result ? (
          <div className="prose max-w-none">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        ) : (
          <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
            <Target className="mb-4 h-12 w-12 text-navy-200" />
            <p className="text-navy-500">Your personalized recommendations will appear here.</p>
            <button onClick={() => refetch()} className="btn-primary mt-4">
              Get Recommendations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
