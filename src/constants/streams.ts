import { BigNumber } from "@ethersproject/bignumber";

export const CUTOFF_STREAM_ID: BigNumber = BigNumber.from(100000);

export enum StreamStatus {
  Created = 1,
  Streaming = 2,
  Cancelled = 3,
  Ended = 4,
}
