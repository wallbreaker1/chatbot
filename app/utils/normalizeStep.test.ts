import { normalizeStep } from "./chatBotUtils";
import data from "../../data/Chatbot-data.json";
import { Step } from "../types/chatBotTypes";

describe("normalizeStep", () => {
  it("should return the correct response when selecting an exchange from a null step", () => {
    const option = data[0].stockExchange;
    const result = normalizeStep(option, {});

    // Assert that result is not null before accessing newStep
    expect(result).not.toBeNull();
    if (result) {
      expect(result.newStep.selectedExchangeCode).toBe(data[0].code);
      expect(result.messageText).toContain("Please select a stock");
      expect(result.messageOptions).toContain("Main Menu");
    }
  });

  it("should return the correct response when selecting a stock from an exchange", () => {
    const selectedExchangeCode = data[0].code;
    const stocks = data[0].topStocks;
    const step: Step = { selectedExchangeCode, stocks };

    const option = stocks[0].stockName;
    const result = normalizeStep(option, step);

    expect(result).not.toBeNull();
    if (result) {
      expect(result.newStep.selectedStockCode).toBe(stocks[0].code);
      expect(result.newStep.selectedStockPrice).toBe(stocks[0].price);
      expect(result.messageText).toContain(
        `The price of ${stocks[0].stockName}`
      );
      expect(result.messageOptions).toEqual(["Back", "Main Menu"]);
    }
  });

  it('should return the previous level when selecting "Back" from a selected stock', () => {
    const step: Step = {
      selectedExchangeCode: data[0].code,
      stocks: data[0].topStocks,
      selectedStockCode: data[0].topStocks[0].code,
      selectedStockPrice: data[0].topStocks[0].price,
    };

    const result = normalizeStep("Back", step);

    expect(result).not.toBeNull();
    if (result) {
      expect(result.newStep.selectedExchangeCode).toBe(data[0].code);
      expect(result.newStep.selectedStockCode).toBeUndefined();
      expect(result.newStep.stocks).toEqual(data[0].topStocks);
      expect(result.messageOptions).toContain("Main Menu");
    }
  });

  it("should return null if no matching exchange or stock is found", () => {
    const step: Step = {
      selectedExchangeCode: data[0].code,
      stocks: data[0].topStocks,
    };
    const option = "Nonexistent Stock Exchange or Stock";
    const result = normalizeStep(option, step);

    expect(result).toBeNull();
  });
});
