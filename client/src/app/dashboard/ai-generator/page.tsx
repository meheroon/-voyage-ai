"use client";

import { useState } from "react";
import { aiAPI } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { Sparkles, Loader2, Download, RefreshCw } from "lucide-react";

const contentTypes = [
  { value: "blog_post", label: "Blog Post" },
  { value: "travel_guide", label: "Travel Guide" },
  { value: "destination_review", label: "Destination Review" },
  { value: "packing_list", label: "Packing List" },
  { value: "social_media_post", label: "Social Media Post" },
  { value: "email_newsletter", label: "Email Newsletter" },
];

const tones = [
  { value: "informative", label: "Informative" },
  { value: "casual", label: "Casual" },
  { value: "professional", label: "Professional" },
  { value: "enthusiastic", label: "Enthusiastic" },
  { value: "luxurious", label: "Luxurious" },
];

const lengths = [
  { value: "short", label: "Short (~300 words)" },
  { value: "medium", label: "Medium (~700 words)" },
  { value: "long", label: "Long (~1200 words)" },
];

export default function AIGeneratorPage() {
  const [form, setForm] = useState({ type: "blog_post", topic: "", length: "medium", tone: "informative" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ topic: string; type: string; content: string }[]>([]);

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleGenerate = async (retry = false) => {
    if (!form.topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }
    setLoading(true);
    if (!retry) setResult("");
    try {
      const res = await aiAPI.generateContent(form);
      setResult(res.data.data.content);
      setHistory([{ topic: form.topic, type: form.type, content: res.data.data.content }, ...history]);
      toast.success("Content generated!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.type}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">AI Content Generator</h1>
        <p className="text-navy-500">Generate travel blogs, guides, reviews, and more with AI.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="card space-y-4 p-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Content Type</label>
              <select value={form.type} onChange={(e) => update("type", e.target.value)} className="input-field">
                {contentTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Topic *</label>
              <textarea
                value={form.topic}
                onChange={(e) => update("topic", e.target.value)}
                className="input-field h-24 resize-none"
                placeholder="e.g., Top 10 hidden gems in Kyoto for cherry blossom season"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-navy-700">Length</label>
                <select value={form.length} onChange={(e) => update("length", e.target.value)} className="input-field">
                  {lengths.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy-700">Tone</label>
                <select value={form.tone} onChange={(e) => update("tone", e.target.value)} className="input-field">
                  {tones.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={() => handleGenerate()} disabled={loading} className="btn-primary w-full">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</> : <><Sparkles className="h-4 w-4" /> Generate Content</>}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card min-h-[500px] p-6">
            {result ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-navy-900">Generated Content</h2>
                  <div className="flex gap-2">
                    <button onClick={() => handleGenerate(true)} className="flex items-center gap-1 text-sm text-navy-600 hover:text-primary-600">
                      <RefreshCw className="h-4 w-4" /> Regenerate
                    </button>
                    <button onClick={handleDownload} className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
                      <Download className="h-4 w-4" /> Download
                    </button>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              </>
            ) : (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <Sparkles className="mb-4 h-12 w-12 text-navy-200" />
                <p className="text-navy-500">Your AI-generated content will appear here.</p>
                <p className="text-sm text-navy-400">Choose a type, enter a topic, and click Generate.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
