"use client";

import React, { useState } from "react";
import useChatbot from "../hooks/useChatbotState";

export default function Chatbot() {
  const { messages, handleOptionClick, messagesEndRef } = useChatbot();
  const [inputText, setInputText] = useState<string>("");

  const handleInputSubmit = () => {
    if (inputText.trim()) {
      handleOptionClick(inputText.trim());
      setInputText("");
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg">
      {/* Title Section */}
      <div className="bg-blue-500 p-4 text-white text-center font-bold text-lg rounded-t-lg">
        LSEG Chatbot
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col items-start">
            <div
              className={`p-3 rounded-lg text-black max-w-xs ${
                message.sender === "user"
                  ? "bg-gray-200 ml-auto text-right w-2/3"
                  : "bg-blue-100 mr-auto text-center w-full border border-blue-300"
              }`}
            >
              {message.text}
            </div>
            {message.options && (
              <ul className="mt-2 space-y-1 w-full flex flex-col items-center">
                {message.options.map((option, idx) => (
                  <li
                    key={idx}
                    className="text-blue-700 cursor-pointer bg-white border border-blue-300 rounded-md py-2 px-4 w-3/4 text-center hover:bg-blue-200 transition-colors"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex p-2 border-t border-gray-300">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg border border-gray-300 outline-none"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
        />
        <button
          onClick={handleInputSubmit}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
