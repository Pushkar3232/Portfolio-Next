// app/chatbot/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Send, User, Bot, Menu, X, Home, Copy, Check, MessageCircle, Sparkles } from "lucide-react";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "Hello! 👋 I'm Pushkar's AI assistant, trained on his comprehensive portfolio data. I can help you learn about his professional experience, technical skills, projects, and achievements. What would you like to know?" 
    },
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Function to format Markdown-like text into HTML
  const formatText = (text: string) => {
    let formattedText = text;

    // Convert newlines to <br /> (excluding code blocks)
    formattedText = formattedText.replace(/\n(?![\s\S]*?```)/g, "<br />");

    // Convert **bold** to <strong>bold</strong>
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert *italic* to <em>italic</em>
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Convert * item to <ul><li>item</li></ul> (unordered list)
    formattedText = formattedText.replace(/^\* (.+)$/gm, "<ul><li>$1</li></ul>");

    // Convert numbered lists (e.g., 1. item) to <ol><li>item</li></ol>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input.trim();

    // Append the user message
    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    // Append an empty bot message as a placeholder
    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);

    setIsBotTyping(true);
    setInput("");

    try {
      const response = await fetch("https://llm-api-1-96x5.onrender.com/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Get the complete response as text
      const resultText = await response.text();

      // Format text before updating the bot response
      const formattedResponse = formatText(resultText);

      // Update the last bot message with the formatted response
      setMessages((prevMessages) => {
        const lastIndex = prevMessages.length - 1;
        const updatedMessages = [...prevMessages];
        updatedMessages[lastIndex] = {
          ...updatedMessages[lastIndex],
          text: formattedResponse,
        };
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error fetching bot response:", error);

      setMessages((prevMessages) => {
        const lastIndex = prevMessages.length - 1;
        const updatedMessages = [...prevMessages];
        updatedMessages[lastIndex] = {
          ...updatedMessages[lastIndex],
          text: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        };
        return updatedMessages;
      });
    } finally {
      setIsBotTyping(false);
    }
  };

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const suggestedQuestions = [
    {
      text: "Tell me about Pushkar's professional experience",
      icon: "💼"
    },
    {
      text: "What are his core technical skills?",
      icon: "⚡"
    },
    {
      text: "Show me his most recent projects",
      icon: "🚀"
    },
    {
      text: "What technologies does he specialize in?",
      icon: "💻"
    }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-white flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-r border-gray-200/50 shadow-2xl transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Pushkar AI</h2>
                  <p className="text-sm text-gray-500">Portfolio Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6">
            <nav className="space-y-2">
              <Link
                href="/"
                className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <Home className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                <span className="text-gray-700 group-hover:text-gray-900 font-medium">Back to Portfolio</span>
              </Link>
              
              <div className="pt-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h3>
                <button className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 transition-all duration-200 group text-left">
                  <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  <span className="text-gray-700 group-hover:text-gray-900 font-medium">New Conversation</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-gray-200/50">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">AI Assistant Online</span>
                </div>
                <p className="text-xs text-gray-500">Built with ❤️ by Pushkar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Pushkar's AI Assistant</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-gray-500">Online & Ready to Help</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
            <span>Powered by AI</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>Real-time responses</span>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {messages.length === 1 && (
                <div className="text-center py-16">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                      <Bot className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Pushkar's AI Assistant</h2>
                  <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                    I'm here to help you learn about Pushkar's professional journey, technical expertise, and project portfolio. 
                    Ask me anything!
                  </p>
                  
                  {/* Suggested Questions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(question.text)}
                        className="group p-6 text-left bg-white hover:bg-gray-50 rounded-2xl border border-gray-200 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-start space-x-4">
                          <span className="text-2xl">{question.icon}</span>
                          <div className="flex-1">
                            <p className="text-gray-700 group-hover:text-gray-900 font-medium leading-relaxed">
                              {question.text}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-4xl ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 ${msg.sender === "user" ? "ml-4" : "mr-4"}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                        msg.sender === "user" 
                          ? "bg-gradient-to-r from-blue-600 to-blue-700" 
                          : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
                      }`}>
                        {msg.sender === "user" ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className={`flex-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                      <div className={`inline-block px-6 py-4 rounded-2xl max-w-full shadow-sm ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                          : "bg-white text-gray-900 border border-gray-200"
                      }`}>
                        <div
                          className={`leading-relaxed ${
                            msg.sender === "user" ? "text-white" : "text-gray-800"
                          }`}
                          dangerouslySetInnerHTML={{ __html: msg.text }}
                        />
                      </div>
                      
                      {/* Copy Button for Bot Messages */}
                      {msg.sender === "bot" && msg.text && (
                        <button
                          onClick={() => handleCopy(msg.text, idx)}
                          className="mt-3 p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700"
                          title="Copy message"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-4 h-4 text-green-600" />
                              <span className="text-green-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="flex">
                    <div className="mr-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-500 ml-2">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

   

{/* Input Area */}
<div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-xl p-6">
  <div className="max-w-4xl mx-auto">
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end space-x-4">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type Here"
            className="w-full px-6 py-4 pr-14 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32 min-h-[56px] shadow-sm bg-white text-gray-900 placeholder-gray-500"
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
            className="absolute right-3 bottom-3 p-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
    
    {/* Footer Info */}
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-500">
        <span className="font-medium">💡 Tip:</span> Press Enter to send • Shift+Enter for new line • Ask detailed questions for better responses
      </p>
    </div>
  </div>
</div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatbotPage;