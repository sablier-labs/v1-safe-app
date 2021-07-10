import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { isFuture, isPast } from "date-fns";

import { Stream, StreamStatus } from "../types";

function currentUnixTimestamp() {
  return Math.trunc(Date.now() / 1000);
}

function getUserShare(value: BigNumberish, streamDuration: BigNumberish, ownedDuration: BigNumberish): BigNumber {
  if (BigNumber.from(ownedDuration).lte(Zero)) {
    return Zero;
  }
  if (BigNumber.from(ownedDuration).gte(streamDuration)) {
    return BigNumber.from(value);
  }
  return BigNumber.from(value).mul(ownedDuration).div(streamDuration);
}

export function getRecipientShare(
  value: BigNumberish,
  startTime: BigNumberish,
  endTime: BigNumberish,
  cancellationTime?: BigNumberish,
): BigNumber {
  const streamDuration = BigNumber.from(endTime).sub(startTime);
  const elapsedDuration = BigNumber.from(cancellationTime || currentUnixTimestamp()).sub(startTime);
  return getUserShare(value, streamDuration, elapsedDuration);
}

export function getProgressAsPercentage(
  startTime: BigNumberish,
  endTime: BigNumberish,
  cancellationTime?: BigNumberish,
): number {
  return getRecipientShare(10000, startTime, endTime, cancellationTime).toNumber() / 100;
}

export function getSenderShare(
  value: BigNumberish,
  startTime: BigNumberish,
  endTime: BigNumberish,
  cancellationTime?: BigNumberish,
): BigNumber {
  const streamDuration = BigNumber.from(endTime).sub(startTime);
  const remainingDuration = BigNumber.from(endTime).sub(cancellationTime || currentUnixTimestamp());
  return getUserShare(value, streamDuration, remainingDuration);
}

export const getStreamStatus = (stream: Stream): StreamStatus => {
  const { cancellation, startTime, stopTime } = stream;
  if (cancellation !== null) {
    return StreamStatus.Cancelled;
  }
  if (isFuture(new Date(startTime * 1000))) {
    return StreamStatus.Pending;
  }
  if (isPast(new Date(stopTime * 1000))) {
    return StreamStatus.Ended;
  }
  return StreamStatus.Active;
};
