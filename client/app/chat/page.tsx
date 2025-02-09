"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useAuthContext } from "@/hooks/useAuthContext";

type ChatMessage = {
  sender: "user" | "ai";
  text: string;
};

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<any>(null);
  const { user } = useAuthContext();

  // Log user for debugging
  console.log("Authenticated user:", user?.token);

  useEffect(() => {
    // If no user, do not run the effect.
    if (!user || !user.token) return;

    // Create a chat session with the valid token.
    const createChatSession = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/chat/session",
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`,
            },
          }
        );
        console.log("Chat session created:", response.data);
        setSessionId(response.data.id);
      } catch (error) {
        console.error("Error creating chat session:", error);
      }
    };

    createChatSession();

    // Initialize Socket.IO client with authentication
    const newSocket = io("http://localhost:5000", {
      withCredentials: true,
      auth: {
        token: `Bearer ${user.token}`,
      },

    });

    setSocket(newSocket);

    newSocket.on("receiveMessage", (data: { userMessage: string; aiResponse: string }) => {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: data.userMessage },
        { sender: "ai", text: data.aiResponse },
      ]);
    });

  }, [user]); 

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!input.trim() || sessionId === null || !socket) return;

    socket.emit("sendMessage", { sessionId, userId: user?.id, message: input });
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Chat with AI</h1>

        <div className="border border-gray-300 rounded p-4 h-80 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                  msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <p className="text-gray-500 text-center">Loading...</p>}
        </div>

        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
