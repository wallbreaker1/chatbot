import data from "../../data/Chatbot-data.json";
import { Exchange, Stock, Step, Message } from "../types/chatBotTypes";

// Updated helper functions
const handleExchangeSelection = (option: string) => {
  const selectedExchange = data.find(
    (exchange: Exchange) => exchange.stockExchange === option
  );
  if (selectedExchange) {
    return {
      newStep: {
        selectedExchangeCode: selectedExchange.code,
        stocks: selectedExchange.topStocks,
      },
      messageText: `Please select a stock from ${selectedExchange.stockExchange}:`,
      messageOptions: selectedExchange.topStocks
        .map((stock) => stock.stockName)
        .concat("Main Menu"),
    };
  }
  return null;
};

// Now requires non-null currentStep parameter
const handleStockSelection = (
  option: string,
  currentStep: NonNullable<Step>
) => {
  const selectedStock = currentStep.stocks?.find(
    (stock: Stock) => stock.stockName === option
  );
  if (selectedStock) {
    return {
      newStep: {
        ...currentStep,
        selectedStockCode: selectedStock.code,
        selectedStockPrice: selectedStock.price,
      },
      messageText: `The price of ${selectedStock.stockName} is $${selectedStock.price}`,
      messageOptions: ["Back", "Main Menu"],
    };
  }
  return null;
};

// Updated to require currentStep parameter as non-null
const handleBackOption = (currentStep: NonNullable<Step>) => {
  const selectedExchangeName = data.find(
    (exchange) => exchange.code === currentStep.selectedExchangeCode
  )?.stockExchange;

  return {
    newStep: {
      selectedExchangeCode: currentStep.selectedExchangeCode,
      stocks: currentStep.stocks,
    },
    messageText: `Please select a stock from ${
      selectedExchangeName || "this exchange"
    }:`,
    messageOptions:
      currentStep.stocks
        ?.map((stock: Stock) => stock.stockName)
        .concat("Main Menu") || [],
  };
};

// Main normalizeStep function with refined type checking
export const normalizeStep = (
  option: string,
  currentStep: Step
): {
  newStep: Step;
  messageText: string;
  messageOptions: string[];
} | null => {
  if (!currentStep.selectedExchangeCode) {
    return handleExchangeSelection(option);
  }

  if (currentStep.selectedExchangeCode && !currentStep.selectedStockCode) {
    return handleStockSelection(option, currentStep);
  }

  if (currentStep.selectedStockCode && option === "Back") {
    return handleBackOption(currentStep);
  }

  return null;
};

// Updated updateMessages function with setMessages passed as parameter
export const updateMessages = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  userText: string,
  botText: string,
  options: string[] = []
) => {
  setMessages((prevMessages: Message[]) => [
    ...prevMessages,
    { sender: "user", text: userText },
    { sender: "bot", text: botText, options },
  ]);
};
