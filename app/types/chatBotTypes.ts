export type Message = {
  sender: "user" | "bot";
  text: string;
  options?: string[];
};

export type Stock = {
  code: string;
  stockName: string;
  price: number;
};

export type Exchange = {
  code: string;
  stockExchange: string;
  topStocks: Stock[];
};

export type Step = {
  selectedExchangeCode?: string;
  stocks?: Stock[];
  selectedStockCode?: string;
  selectedStockPrice?: number;
};
