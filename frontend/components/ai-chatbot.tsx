"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIMessageContent {
  results?: Record<string, unknown>[]
  explanation?: string
  [key: string]: unknown
}

type MessageContent = string | AIMessageContent

interface Message {
  id: string
  content: MessageContent
  sender: "user" | "ai"
  timestamp: Date
}

export function AIChatbot() {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Only render on client-side to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    
    // Add welcome message when component mounts
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome-message",
          content: "Hi! I'm your StartupTN AI assistant. I can help you find funding opportunities, connect with mentors, and guide you through your startup journey. What can I help you with today?",
          sender: "ai",
          timestamp: new Date(),
        },
      ])
    }
  }, [messages.length])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string): Promise<AIMessageContent> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to get response from AI');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error calling AI API:', error);
      return {
        explanation: "I'm sorry, I'm having trouble connecting to the AI service. Please try again later."
      };
    }
  }

  const handleSendMessage = async () => {
    const messageText = inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText as MessageContent,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const aiResponseContent = await generateAIResponse(messageText);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseContent,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && isMounted && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 md:w-[550px] lg:w-[650px] h-[600px] shadow-2xl z-50 flex flex-col rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-medium">StartupTN AI Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "rounded-lg p-3 text-base shadow-sm border",
                    message.sender === "user" ? "bg-blue-600 text-white max-w-[85%] ml-auto" : "bg-white border border-gray-200 shadow-sm max-w-[85%]",
                  )}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "ai" && <Bot className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />}
                    {message.sender === "user" && <User className="h-4 w-4 mt-0.5 text-white flex-shrink-0" />}
                    <div className="w-full">
                      {message.sender === 'ai' && typeof message.content === 'object' ? (
                        <div className="space-y-3">
                          {message.content.results?.length > 0 ? (
                            message.content.results.map((result: Record<string, unknown>, index: number) => (
                              <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                {typeof result === 'object' ? (
                                  <div className="space-y-1.5">
                                    {Object.entries(result).map(([key, value]) => (
                                      <div key={key} className="flex flex-wrap gap-x-2">
                                        <span className="font-medium text-gray-700">
                                          {key.replace(/_/g, ' ')}:
                                        </span>
                                        <span className="text-gray-900">
                                          {String(value || 'N/A').split('\n').map((line, i, arr) => (
                                            <span key={i}>
                                              {line}
                                              {i < arr.length - 1 && <br />}
                                            </span>
                                          ))}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="whitespace-pre-line">{String(result)}</div>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="whitespace-pre-line">
                              {String(message.content)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="whitespace-pre-line">{String(message.content)}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4 bg-gray-50">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about startups..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
