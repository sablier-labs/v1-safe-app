import { BigNumberish } from "@ethersproject/bignumber";

import {
  ARBITRUM_MAINNET_ID,
  AVALANCHE_MAINNET_ID,
  BSC_MAINNET_ID,
  ETHEREUM_MAINNET_ID,
  GOERLI_ID,
  OPTIMISM_MAINNET_ID,
  POLYGON_MAINNET_ID,
} from "../constants/chains";
import { StreamStatus } from "../constants/streams";

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

export type HumanReadableStream = {
  humanDeposit: string;
  humanStartTime: string;
  humanStopTime: string;
  humanStartTimeOrder: number;
  humanStopTimeOrder: number;
  id: number;
  humanRecipient: string;
  humanSender: string;
  status: StreamStatus;
  token: Token;
};

export type SablierChainId =
  | typeof ARBITRUM_MAINNET_ID
  | typeof AVALANCHE_MAINNET_ID
  | typeof BSC_MAINNET_ID
  | typeof ETHEREUM_MAINNET_ID
  | typeof GOERLI_ID
  | typeof OPTIMISM_MAINNET_ID
  | typeof POLYGON_MAINNET_ID;

export type Stream = {
  id: number;
  cancellation: Cancellation | null;
  deposit: string;
  recipient: string;
  sender: string;
  startTime: number;
  stopTime: number;
  timestamp: number;
  token: Token;
  withdrawals: {
    amount: BigNumberish;
  }[];
};

export type Token = {
  id: number;
  decimals: number;
  name: string;
  symbol: string;
};

export type TokenItem = {
  address: string;
  decimals: number;
  id: string;
  iconUrl: string; // the token logo
  label: string; // the symbol
};
