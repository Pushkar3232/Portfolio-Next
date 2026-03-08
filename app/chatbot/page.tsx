// app/chatbot/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Send, User, Bot, Copy, Check, RefreshCw, AlertTriangle, ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GridBackground } from "@/components/ui/grid-background";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Message {
  sender: "user" | "bot";
  text: string;
  isError?: boolean;
}

interface ApiMessage {
  role: "user" | "assistant";
  content: string;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! 👋 I'm Pushkar's AI assistant. Ask me anything about his experience, skills, or projects!",
    },
  ]);
  const [history, setHistory] = useState<ApiMessage[]>([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [serverStatus, setServerStatus] = useState<"online" | "offline" | "checking">("checking");
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    setServerStatus("checking");
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch("/api/chat/health", {
        method: "GET",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      setServerStatus(response.ok ? "online" : "offline");
    } catch {
      setServerStatus("offline");
    }
  };

  const formatText = (text: string) => {
    let formattedText = text;
    
    // Convert URLs to clickable links
    formattedText = formattedText.replace(
      /\b(https?:\/\/[^\s<>"{}|\\^`\[\]]*|www\.[^\s<>"{}|\\^`\[\]]*)/gi,
      '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; cursor: pointer;">$1</a>'
    );
    
    // Convert email addresses to mailto links
    formattedText = formattedText.replace(
      /\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/g,
      '<a href="mailto:$1" style="color: #2563eb; text-decoration: underline; cursor: pointer;">$1</a>'
    );
    
    formattedText = formattedText.replace(/\n(?![\s\S]*?```)/g, "<br />");
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<em>$1</em>");
    formattedText = formattedText.replace(/^\* (.+)$/gm, "<ul><li>$1</li></ul>");
    formattedText = formattedText.replace(/^(\d+)\. (.+)$/gm, "<ol><li>$2</li></ol>");
    return formattedText;
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text.replace(/<[^>]*>/g, ''));
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleRetry = () => {
    if (lastFailedPrompt) {
      setInput(lastFailedPrompt);
      setMessages((prev) => prev.slice(0, prev.length - 1));
      setLastFailedPrompt(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isBotTyping) return;

    const userInput = input.trim();
    setInput("");
    setLastFailedPrompt(null);

    const newHistory: ApiMessage[] = [
      ...history,
      { role: "user", content: userInput },
    ];

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userInput },
      { sender: "bot", text: "" },
    ]);
    setIsBotTyping(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}`);
      }

      // Read the streaming response chunk by chunk
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullResponse += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            sender: "bot",
            text: formatText(fullResponse),
            isError: false,
          };
          return updated;
        });
      }

      // Save assistant reply to history for context on next turn
      setHistory([...newHistory, { role: "assistant", content: fullResponse }]);
      setServerStatus("online");
    } catch (error: unknown) {
      const isAbort = error instanceof Error && error.name === "AbortError";
      const errMsg = isAbort
        ? "Request timed out. Please try again."
        : "Something went wrong. Please try again in a moment.";

      setLastFailedPrompt(userInput);
      setServerStatus("offline");
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          sender: "bot",
          text: errMsg,
          isError: true,
        };
        return updated;
      });
    } finally {
      setIsBotTyping(false);
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const suggestedQuestions = [
    { text: "Tell me about Pushkar's experience", icon: "💼" },
    { text: "What are his technical skills?", icon: "⚡" },
    { text: "Show me his recent projects", icon: "🚀" },
    { text: "What technologies does he use?", icon: "💻" }
  ];

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden relative">
      {/* Grid Background Pattern */}
      <GridBackground className="opacity-40 pointer-events-none" />

      {/* Minimal Header - Back Button Only */}
      <div className="px-3 md:px-6 py-3 flex items-center z-20 sticky top-0">
        <Link
          href="/"
          className="p-2 -ml-2 hover:bg-secondary/50 rounded-lg transition-all duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative z-10">
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-6 md:py-8">
          <div className="max-w-2xl mx-auto space-y-5 ">
            {/* Welcome Screen */}
            <AnimatePresence>
              {messages.length === 1 && (
                <motion.div 
                  className="text-center py-8 md:py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  variants={staggerContainer}
                >
                  <motion.div 
                    className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    variants={fadeInUp}
                  >
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary/70" />
                  </motion.div>
                  <motion.h2 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground mb-2 md:mb-4 leading-tight"
                    variants={fadeInUp}
                  >
                    Hey, I&apos;m Pushk<span className="text-primary">a</span>r&apos;s AI
                  </motion.h2>
                  <motion.p 
                    className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-md mx-auto font-medium"
                    variants={fadeInUp}
                  >
                    Ask me anything about his experience, skills, projects, or anything else!
                  </motion.p>
                  
                  {/* Suggested Questions */}
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    variants={staggerContainer}
                  >
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setInput(question.text)}
                        className="group p-4 md:p-5 text-left bg-card/20 hover:bg-card/40 border border-border/40 hover:border-primary/50 rounded-xl md:rounded-2xl transition-all duration-300 active:scale-95 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                        whileHover={{ y: -4, border: "1px solid hsl(var(--primary))" }}
                        variants={fadeInUp}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{question.icon}</span>
                          <p className="text-sm md:text-base text-foreground group-hover:text-primary transition-colors font-medium">
                            {question.text}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`flex max-w-[85%] md:max-w-[70%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 ${msg.sender === "user" ? "ml-2 md:ml-3" : "mr-2 md:mr-3"}`}>
                      <motion.div 
                        className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          msg.sender === "user" 
                            ? "bg-primary/30 border border-primary/40" 
                            : "bg-secondary/20 border border-border/40"
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {msg.sender === "user" ? (
                          <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
                        )}
                      </motion.div>
                    </div>

                    {/* Message Content */}
                    <div className={`flex-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                      <motion.div 
                        className={`inline-block px-4 py-2.5 md:px-4 md:py-3 rounded-2xl ${
                          msg.sender === "user"
                            ? "bg-primary/70 text-primary-foreground rounded-br-md shadow-lg shadow-primary/20 backdrop-blur-md"
                            : msg.isError 
                              ? "bg-destructive/10 text-destructive border border-destructive/30 rounded-bl-md backdrop-blur-sm"
                              : "bg-secondary/30 text-foreground rounded-bl-md border border-border/40 backdrop-blur-md"
                        }`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {msg.isError && (
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                            <span className="text-xs font-medium">Connection Issue</span>
                          </div>
                        )}
                        {/* Show bouncing dots while streaming hasn't started yet */}
                        {msg.sender === "bot" && isBotTyping && idx === messages.length - 1 && msg.text === "" ? (
                          <div className="flex space-x-1.5 py-1">
                            <motion.div 
                              className="w-2 h-2 bg-muted-foreground rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity }}
                            ></motion.div>
                            <motion.div 
                              className="w-2 h-2 bg-muted-foreground rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                            ></motion.div>
                            <motion.div 
                              className="w-2 h-2 bg-muted-foreground rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            ></motion.div>
                          </div>
                        ) : (
                          <div
                            className="text-sm md:text-base leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: msg.text }}
                          />
                        )}
                      </motion.div>
                      
                      {/* Actions for Bot Messages */}
                      <AnimatePresence>
                        {msg.sender === "bot" && msg.text && !(isBotTyping && idx === messages.length - 1) && (
                          <motion.div 
                            className="flex items-center space-x-2 mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {msg.isError && lastFailedPrompt && (
                              <button
                                onClick={handleRetry}
                                className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 active:scale-95"
                              >
                                <RefreshCw className="w-3 h-3" />
                                <span>Retry</span>
                              </button>
                            )}
                            {!msg.isError && (
                              <button
                                onClick={() => handleCopy(msg.text, idx)}
                                className="flex items-center space-x-1 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-all duration-200"
                              >
                                {copiedIndex === idx ? (
                                  <>
                                    <Check className="w-3 h-3 text-green-500" />
                                    <span className="text-green-500">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className=" p-3 md:p-4">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-end space-x-2 md:space-x-3">
                <div className="flex-1 relative">
                  <motion.textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about Pushkar..."
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 pr-10 md:pr-12 border border-border/50 bg-background/30 text-foreground placeholder-muted-foreground rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none max-h-32 min-h-[44px] md:min-h-[48px] text-sm md:text-base transition-all duration-200 backdrop-blur-md"
                    disabled={isBotTyping}
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isBotTyping}
                    className="absolute right-2 md:right-2 bottom-2 md:bottom-2.5 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary shadow-lg shadow-primary/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </form>
            <p className="text-xs text-muted-foreground/70 text-center mt-2 md:mt-3 font-medium">
              Powered by Grok &middot; Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
