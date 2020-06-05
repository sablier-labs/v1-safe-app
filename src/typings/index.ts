export type ProxyStream = {
  id: number;
  recipient: string;
  sender: string;
  stream: Stream;
  timestamp: number;
};

export type Stream = {
  id: number;
  cancellation: any;
  deposit: string;
  recipient: string;
  sender: string;
  startTime: number;
  stopTime: number;
  token: Token;
};

export type Token = {
  id: number;
  decimals: number;
  name: string;
  symbol: string;
};

export type TransactionList = { [key: string]: string | number }[];
