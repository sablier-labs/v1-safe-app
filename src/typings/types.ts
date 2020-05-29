export type Stream = {
  id: string;
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
