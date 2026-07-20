"use client";

import { useState, useRef } from "react";
import { useAnalyzeData } from "@/hooks/use-queries";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { BarChart3, Loader2, FileText, Download, Upload, X } from "lucide-react";

const sampleData = `Travel Spending Summary:
- January: Flights $450, Hotels $680, Food $320, Activities $150, Transport $90
- February: Flights $200, Hotels $450, Food $280, Activities $100, Transport $60
- March: Flights $890, Hotels $1200, Food $520, Activities $350, Transport $180
- April: Flights $1200, Hotels $1800, Food $650, Activities $500, Transport $250
- May: Flights $300, Hotels $500, Food $250, Activities $120, Transport $70
- June: Flights $1500, Hotels $2200, Food $800, Activities $600, Transport $300

Destinations Visited: Bali, Tokyo, Paris, Iceland, Costa Rica, Morocco
Average Trip Duration: 7.5 days
Average Daily Spend: $185
Most Expensive Category: Accommodation (42%)
Budget Utilization: 78%
Peak Travel Month: June
Satisfaction Rating: 4.6/5`;

export default function AIAnalyzerPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [fileName, setFileName] = useState("");
  const analyzeMutation = useAnalyzeData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInput(content);
      toast.success(`Loaded ${file.name}`);
    };

    if (file.name.endsWith(".json")) {
      reader.readAsText(file);
    } else if (file.name.endsWith(".csv") || file.name.endsWith(".txt")) {
      reader.readAsText(file);
    } else {
      toast.error("Unsupported file type. Please upload CSV, JSON, or TXT files.");
      setFileName("");
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAnalyze = async () => {
    if (!input.trim()) {
      toast.error("Please enter or upload your travel data");
      return;
    }
    try {
      const res = await analyzeMutation.mutateAsync({ data: input });
      setResult(res.data.data.analysis);
      toast.success("Analysis complete!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Analysis failed");
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `travel-analysis-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
    setFileName("");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">AI Data Analyzer</h1>
        <p className="text-navy-500">Upload or paste your travel data and let AI provide actionable insights.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-navy-900">Your Data</h2>
              <div className="flex gap-2">
                <button onClick={() => setInput(sampleData)} className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
                  <FileText className="h-4 w-4" />
                  Load Sample
                </button>
                {input && (
                  <button onClick={handleClear} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600">
                    <X className="h-4 w-4" />
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* File Upload Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="mb-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-navy-200 p-6 transition-colors hover:border-primary-400 hover:bg-primary-50"
            >
              <Upload className="mb-2 h-8 w-8 text-navy-400" />
              <p className="text-sm font-medium text-navy-600">Click to upload or drag and drop</p>
              <p className="text-xs text-navy-400">CSV, JSON, or TXT files</p>
              {fileName && (
                <p className="mt-2 text-xs font-medium text-primary-600">Loaded: {fileName}</p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.json,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-field h-64 resize-none font-mono text-sm"
              placeholder={`Paste your travel data here...\n\nExample:\n- Trip to Paris: $2500 total, 5 days\n- Trip to Bali: $1800 total, 10 days\n- Flights this year: $3500\n- Hotel spending: $4200`}
            />
            <button onClick={handleAnalyze} disabled={analyzeMutation.isPending || !input.trim()} className="btn-primary mt-4 w-full">
              {analyzeMutation.isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing...</> : <><BarChart3 className="h-4 w-4" /> Analyze Data</>}
            </button>
          </div>
        </div>

        <div>
          <div className="card min-h-[500px] p-6">
            {result ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-navy-900">Analysis Results</h2>
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
                <BarChart3 className="mb-4 h-12 w-12 text-navy-200" />
                <p className="text-navy-500">AI analysis results will appear here.</p>
                <p className="text-sm text-navy-400">Upload or paste your travel data and click Analyze.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
