import { useState, useEffect, useRef } from "react";
import data from "../../data/Chatbot-data.json";
import { Message, Step } from "../types/chatBotTypes";
import { normalizeStep } from "../utils/chatBotUtils";

const useChatbot = () => {
  const [step, setStep] = useState<Step | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the latest message whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize the default bot message on mount
  useEffect(() => {
    const exchangeOptions = data.map((exchange) => exchange.stockExchange);
    const initialMessage: Message = {
      sender: "bot",
      text: "Please select a stock exchange by code or type in a stock code for its price:",
      options: exchangeOptions,
    };
    setMessages([initialMessage]);
  }, []);

  // Handle option selection
  const handleOptionClick = (option: string) => {
    const result = normalizeStep(option, step);
    if (!result) {
      setStep(null);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Please select a stock exchange by code or type in a stock code for its price:",
          options: data.map((exchange) => exchange.stockExchange),
        },
      ]);
      return;
    }
    setStep(result.newStep);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: option },
      {
        sender: "bot",
        text: result.messageText,
        options: result.messageOptions,
      },
    ]);
  };

  return { step, messages, setMessages, handleOptionClick, messagesEndRef };
};

export default useChatbot;
