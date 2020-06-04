export type Stream = {
  id: string;
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
