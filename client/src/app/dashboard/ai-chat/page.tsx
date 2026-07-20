"use client";

import { useState, useEffect, useRef } from "react";
import { chatAPI } from "@/lib/api";
import { Conversation, ChatMessage } from "@/types";
import toast from "react-hot-toast";
import { Send, Plus, Trash2, MessageCircle, Bot, User, Loader2, X, Menu } from "lucide-react";

const suggestedPrompts = [
  "Plan a 7-day trip to Japan",
  "What are the best beaches in Southeast Asia?",
  "How much does a trip to Europe cost?",
  "Give me packing tips for a mountain trek",
  "Best food destinations in the world?",
];

export default function AIChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [lastSentMessage, setLastSentMessage] = useState<string>("");
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatAPI.getConversations().then((res) => setConversations(res.data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversation = async (id: string) => {
    setActiveConversation(id);
    setMessages([]);
    setShowSidebar(false);
    try {
      const res = await chatAPI.getConversation(id);
      setMessages(res.data.data.messages);
    } catch {
      toast.error("Failed to load conversation");
    }
  };

  const startNewConversation = async () => {
    try {
      const res = await chatAPI.createConversation();
      const newConv = {
        _id: res.data.data._id,
        title: "New Conversation",
        lastMessage: "",
        messageCount: 0,
        createdAt: res.data.data.createdAt,
        updatedAt: res.data.data.updatedAt,
      };
      setConversations([newConv, ...conversations]);
      setActiveConversation(newConv._id);
      setMessages([]);
    } catch {
      toast.error("Failed to create conversation");
    }
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || !activeConversation || sending) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: messageText, timestamp: new Date().toISOString() }]);
    setLastSentMessage(messageText);
    setSending(true);

    try {
      const res = await chatAPI.sendMessage({ conversationId: activeConversation, message: messageText });
      setMessages((prev) => [...prev, res.data.data.message]);

      // Update conversation list
      setConversations((prev) =>
        prev.map((c) =>
          c._id === activeConversation
            ? { ...c, lastMessage: messageText, updatedAt: new Date().toISOString() }
            : c
        )
      );
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to send message";
      const isRateLimit = errorMessage.includes("rate") || errorMessage.includes("temporarily") || errorMessage.includes("busy");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isRateLimit
            ? "I'm experiencing high demand right now. Please wait a moment and try again."
            : errorMessage,
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]);
      if (!isRateLimit) toast.error(errorMessage);
    } finally {
      setSending(false);
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      await chatAPI.deleteConversation(id);
      setConversations(conversations.filter((c) => c._id !== id));
      if (activeConversation === id) {
        setActiveConversation(null);
        setMessages([]);
      }
      toast.success("Conversation deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-navy-200 bg-white">
      {/* Sidebar */}
      <div className={`${showSidebar ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-72 border-r border-navy-200 bg-white transition-transform lg:relative lg:translate-x-0`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-navy-100 p-4">
            <h2 className="font-bold text-navy-900">Conversations</h2>
            <button onClick={() => setShowSidebar(false)} className="lg:hidden text-navy-400">
              <X className="h-5 w-5" />
            </button>
          </div>
          <button onClick={startNewConversation} className="m-3 flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">
            <Plus className="h-4 w-4" />
            New Chat
          </button>
          <div className="flex-1 overflow-y-auto px-3">
            {conversations.map((conv) => (
              <div
                key={conv._id}
                className={`group mb-1 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  activeConversation === conv._id ? "bg-primary-50 text-primary-700" : "text-navy-600 hover:bg-navy-50"
                }`}
                onClick={() => loadConversation(conv._id)}
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate">{conv.title}</span>
                <button onClick={(e) => { e.stopPropagation(); deleteConversation(conv._id); }} className="hidden text-navy-400 hover:text-red-500 group-hover:block">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showSidebar && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setShowSidebar(false)} />}

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-navy-100 px-4 py-3">
          <button onClick={() => setShowSidebar(true)} className="lg:hidden text-navy-600">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
            <Bot className="h-4 w-4 text-primary-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-navy-900">VoyageAI Assistant</h3>
            <p className="text-xs text-navy-500">Ask me anything about travel</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50">
                <Bot className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-navy-900">How can I help you today?</h3>
              <p className="mb-6 max-w-sm text-sm text-navy-500">
                I&apos;m your AI travel assistant. Ask me about destinations, trip planning, packing tips, or anything travel-related.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-navy-200 px-4 py-2 text-sm text-navy-600 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100">
                      <Bot className="h-4 w-4 text-primary-600" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary-600 text-white"
                      : msg.isError
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : "bg-navy-50 text-navy-800"
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    {msg.isError && (
                      <button
                        onClick={() => {
                          // Remove the error message and resend the last user message
                          setMessages((prev) => prev.slice(0, -1));
                          setTimeout(() => sendMessage(lastSentMessage), 0);
                        }}
                        className="mt-2 text-xs font-medium text-amber-600 hover:text-amber-800 underline"
                      >
                        Try again
                      </button>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-100">
                      <User className="h-4 w-4 text-accent-600" />
                    </div>
                  )}
                </div>
              ))}
              {sending && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100">
                    <Bot className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl bg-navy-50 px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-primary-500" />
                    <span className="text-sm text-navy-500">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEnd} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-navy-100 px-4 py-4">
          {activeConversation ? (
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="mx-auto flex max-w-3xl gap-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about destinations, plan a trip, get travel tips..."
                className="input-field flex-1"
                disabled={sending}
              />
              <button type="submit" disabled={!input.trim() || sending} className="btn-primary">
                <Send className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <div className="text-center">
              <button onClick={startNewConversation} className="btn-primary">
                <Plus className="h-4 w-4" />
                Start a New Conversation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
