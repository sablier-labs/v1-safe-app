import { BigNumberish } from "@ethersproject/bignumber";

import {
  BSC_MAINNET_ID,
  ETHEREUM_MAINNET_ID,
  GOERLI_ID,
  KOVAN_ID,
  POLYGON_MAINNET_ID,
  RINKEBY_ID,
  ROPSTEN_ID,
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
  | typeof BSC_MAINNET_ID
  | typeof GOERLI_ID
  | typeof KOVAN_ID
  | typeof ETHEREUM_MAINNET_ID
  | typeof POLYGON_MAINNET_ID
  | typeof RINKEBY_ID
  | typeof ROPSTEN_ID;

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
