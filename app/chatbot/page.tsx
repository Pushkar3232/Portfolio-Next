// app/chatbot/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Send, User, Bot, Copy, Check, RefreshCw, AlertTriangle, ArrowLeft } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  isError?: boolean;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: "bot", 
      text: "Hello! 👋 I'm Pushkar's AI assistant. Ask me anything about his experience, skills, or projects!"
    },
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [serverStatus, setServerStatus] = useState<"online" | "offline" | "checking" | "cold">("checking");
  const [retryCount, setRetryCount] = useState(0);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    setServerStatus("checking");
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch("https://llmapi-production-bc95.up.railway.app/health", {
        method: "GET",
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      setServerStatus(response.ok ? "online" : "cold");
    } catch {
      setServerStatus("cold");
    }
  };

  const formatText = (text: string) => {
    let formattedText = text;
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
      setMessages(prev => prev.filter((_, idx) => idx !== prev.length - 1));
      setLastFailedPrompt(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);
    setIsBotTyping(true);
    setInput("");
    setRetryCount(0);

    const makeRequest = async (attempt: number): Promise<boolean> => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        const response = await fetch("https://llmapi-production-bc95.up.railway.app/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: userInput }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error("Network response was not ok");

        const resultText = await response.text();
        const formattedResponse = formatText(resultText);

        setMessages((prevMessages) => {
          const lastIndex = prevMessages.length - 1;
          const updatedMessages = [...prevMessages];
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            text: formattedResponse,
            isError: false,
          };
          return updatedMessages;
        });

        setServerStatus("online");
        return true;
      } catch (error: unknown) {
        console.error(`Attempt ${attempt} failed:`, error);
        
        const isAbortError = error instanceof Error && error.name === 'AbortError';
        
        if (attempt < 2 && !isAbortError) {
          setRetryCount(attempt + 1);
          setMessages((prevMessages) => {
            const lastIndex = prevMessages.length - 1;
            const updatedMessages = [...prevMessages];
            updatedMessages[lastIndex] = {
              ...updatedMessages[lastIndex],
              text: `⏳ Server is waking up... Retry ${attempt + 1}/2`,
              isError: false,
            };
            return updatedMessages;
          });
          await new Promise(resolve => setTimeout(resolve, 3000));
          return makeRequest(attempt + 1);
        }
        
        return false;
      }
    };

    const success = await makeRequest(0);

    if (!success) {
      setLastFailedPrompt(userInput);
      setServerStatus("cold");
      setMessages((prevMessages) => {
        const lastIndex = prevMessages.length - 1;
        const updatedMessages = [...prevMessages];
        updatedMessages[lastIndex] = {
          ...updatedMessages[lastIndex],
          text: "The server is currently starting up. This usually takes 30-60 seconds. Please try again in a moment.",
          isError: true,
        };
        return updatedMessages;
      });
    }

    setIsBotTyping(false);
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
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #f1f5f9 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #e2e8f0 0%, transparent 50%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-2 p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 hidden sm:inline">Back to Portfolio</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-gray-900">Pushk<span className="text-blue-600">a</span>r AI</h1>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                serverStatus === 'online' ? 'bg-green-500 animate-pulse' :
                serverStatus === 'cold' ? 'bg-yellow-500' :
                'bg-gray-400'
              }`}></div>
              <p className="text-xs text-gray-500">
                {serverStatus === 'online' ? 'Ready' : 
                 serverStatus === 'cold' ? 'Warming up' : 
                 serverStatus === 'checking' ? 'Connecting...' : 'Offline'}
              </p>
            </div>
          </div>
        </div>

        <div className="w-20"></div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative z-10">
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Welcome Screen */}
            {messages.length === 1 && (
              <div className="text-center py-8 md:py-12">
                <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Hi, I&apos;m Pushk<span className="text-blue-600">a</span>r&apos;s AI
                </h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Ask me about his experience, skills, projects, or anything else!
                </p>
                
                {/* Server Status Warning */}
                {serverStatus === 'cold' && (
                  <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl max-w-md mx-auto">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-yellow-800">Server is starting up</p>
                        <p className="text-xs text-yellow-600 mt-1">First response may take 30-60 seconds.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Suggested Questions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question.text)}
                      className="group p-4 text-left bg-white hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{question.icon}</span>
                        <p className="text-sm text-gray-700 group-hover:text-gray-900">
                          {question.text}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-[85%] md:max-w-[75%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 ${msg.sender === "user" ? "ml-3" : "mr-3"}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      msg.sender === "user" 
                        ? "bg-blue-600" 
                        : "bg-gray-900"
                    }`}>
                      {msg.sender === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className={`flex-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    <div className={`inline-block px-4 py-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-md"
                        : msg.isError 
                          ? "bg-red-50 text-red-800 border border-red-200 rounded-bl-md"
                          : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}>
                      {msg.isError && (
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-xs font-medium text-red-600">Connection Issue</span>
                        </div>
                      )}
                      <div
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: msg.text }}
                      />
                    </div>
                    
                    {/* Actions for Bot Messages */}
                    {msg.sender === "bot" && msg.text && !isBotTyping && (
                      <div className="flex items-center space-x-2 mt-2">
                        {msg.isError && lastFailedPrompt && (
                          <button
                            onClick={handleRetry}
                            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Retry</span>
                          </button>
                        )}
                        {!msg.isError && (
                          <button
                            onClick={() => handleCopy(msg.text, idx)}
                            className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {copiedIndex === idx ? (
                              <>
                                <Check className="w-3 h-3 text-green-600" />
                                <span className="text-green-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isBotTyping && (
              <div className="flex justify-start">
                <div className="flex">
                  <div className="mr-3">
                    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                      </div>
                      {retryCount > 0 && (
                        <span className="text-xs text-gray-500 ml-2">Retry {retryCount}/2...</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-end space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={serverStatus === 'cold' ? "Server warming up... You can still type" : "Ask me anything..."}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32 min-h-[48px] text-gray-900 placeholder-gray-400 text-sm"
                    disabled={isBotTyping}
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isBotTyping}
                    className="absolute right-2 bottom-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
            <p className="text-xs text-gray-400 text-center mt-3">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
