import data from "../../data/Chatbot-data.json";
import { Exchange, Stock, Step, Message } from "../types/chatBotTypes";

// Updated normalizeStep function with correct Step type
export const normalizeStep = (
  option: string,
  currentStep: Step
): {
  newStep: Step;
  messageText: string;
  messageOptions: string[];
} | null => {
  if (currentStep === null) {
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
  } else if (
    currentStep.selectedExchangeCode &&
    !currentStep.selectedStockCode
  ) {
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
  } else if (currentStep.selectedStockCode) {
    if (option === "Back") {
      return {
        newStep: {
          selectedExchangeCode: currentStep.selectedExchangeCode,
          stocks: currentStep.stocks,
        },
        messageText: `Please select a stock from ${
          data.find(
            (exchange) => exchange.code === currentStep.selectedExchangeCode
          )?.stockExchange
        }`,
        messageOptions:
          currentStep.stocks
            ?.map((stock: Stock) => stock.stockName)
            .concat("Main Menu") || [],
      };
    }
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
