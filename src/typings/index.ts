export type Cancellation = {
  id: number;
  recipientBalance: string;
  recipientInterest: string;
  sablierInterest: string;
  senderBalance: string;
  senderInterest: string;
  timestamp: number;
  token: Token;
  txHash: string;
};

export type Stream = {
  id: number;
  cancellation: Cancellation | undefined;
  deposit: string;
  recipient: string;
  sender: string;
  startTime: number;
  stopTime: number;
  token: Token;
};

/**
 * The truthful sender of a stream is stored in a proxy stream (defined below)
 * instead of a vanilla stream (defined above). The sender stored in the latter
 * object is the Payroll.sol contract itself.
 */
export type ProxyStream = {
  id: number;
  recipient: string;
  sender: string;
  stream: Stream;
  timestamp: number;
};

export type Token = {
  id: number;
  decimals: number;
  name: string;
  symbol: string;
};

export type TransactionList = { [key: string]: string | number }[];
