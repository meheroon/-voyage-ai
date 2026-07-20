"use client";

import { useState } from "react";
import { useGenerateItinerary } from "@/hooks/use-queries";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { Wand2, Calendar, DollarSign, Users, MapPin, Loader2, Download } from "lucide-react";

export default function AIPlannerPage() {
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "2000",
    travelers: "2",
    preferences: "",
  });
  const [result, setResult] = useState("");
  const generateMutation = useGenerateItinerary();

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.destination || !form.startDate || !form.endDate) {
      toast.error("Please fill in destination and dates");
      return;
    }
    try {
      const res = await generateMutation.mutateAsync({
        destination: form.destination,
        startDate: form.startDate,
        endDate: form.endDate,
        budget: Number(form.budget),
        travelers: Number(form.travelers),
        preferences: form.preferences ? form.preferences.split(",").map((s) => s.trim()) : [],
      });
      setResult(res.data.data.content);
      toast.success("Itinerary generated!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Generation failed");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `itinerary-${form.destination.toLowerCase().replace(/\s+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">AI Trip Planner</h1>
        <p className="text-navy-500">Let AI create a personalized day-by-day itinerary for your trip.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleGenerate} className="card space-y-4 p-6">
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-navy-700">
                <MapPin className="h-4 w-4 text-primary-500" />
                Destination *
              </label>
              <input value={form.destination} onChange={(e) => update("destination", e.target.value)} className="input-field" placeholder="e.g., Kyoto, Japan" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-navy-700">
                  <Calendar className="h-4 w-4 text-primary-500" />
                  Start Date *
                </label>
                <input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-navy-700">
                  <Calendar className="h-4 w-4 text-primary-500" />
                  End Date *
                </label>
                <input type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-navy-700">
                  <DollarSign className="h-4 w-4 text-primary-500" />
                  Budget ($)
                </label>
                <input type="number" value={form.budget} onChange={(e) => update("budget", e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-navy-700">
                  <Users className="h-4 w-4 text-primary-500" />
                  Travelers
                </label>
                <input type="number" value={form.travelers} onChange={(e) => update("travelers", e.target.value)} className="input-field" min="1" />
              </div>
            </div>
            <div>
              <label className="mb-1 text-sm font-medium text-navy-700">Preferences (comma separated)</label>
              <input value={form.preferences} onChange={(e) => update("preferences", e.target.value)} className="input-field" placeholder="food, temples, hiking" />
            </div>
            <button type="submit" disabled={generateMutation.isPending} className="btn-primary w-full">
              {generateMutation.isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</> : <><Wand2 className="h-4 w-4" /> Generate Itinerary</>}
            </button>
          </form>
        </div>

        {/* Result */}
        <div className="lg:col-span-2">
          <div className="card min-h-[500px] p-6">
            {result ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-navy-900">Your Itinerary</h2>
                  <button onClick={handleDownload} className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
                    <Download className="h-4 w-4" /> Download
                  </button>
                </div>
                <div className="prose max-w-none">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              </>
            ) : (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <Wand2 className="mb-4 h-12 w-12 text-navy-200" />
                <p className="text-navy-500">Your AI-generated itinerary will appear here.</p>
                <p className="text-sm text-navy-400">Fill in the details and click Generate.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
