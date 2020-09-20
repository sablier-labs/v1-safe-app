import { BigNumberish } from "@ethersproject/bignumber";

export type Cancellation = {
  id: number;
  recipientBalance: BigNumberish;
  recipientInterest: BigNumberish;
  sablierInterest: BigNumberish;
  senderBalance: BigNumberish;
  senderInterest: BigNumberish;
  timestamp: BigNumberish;
  token: Token;
  txhash: string;
};

export type Stream = {
  id: number;
  cancellation: Cancellation | null;
  deposit: string;
  recipient: string;
  sender: string;
  startTime: number;
  stopTime: number;
  token: Token;
  withdrawals: {
    amount: BigNumberish;
  }[];
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

export type Transaction = {
  data: string;
  to: string;
  value: string;
};
