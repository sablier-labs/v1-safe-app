import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { isFuture, isPast } from "date-fns";

import { Stream, StreamStatus } from "../types";

/// Subtract 15 seconds so that the app doesn't get ahead of the blockchain.
function getNow() {
  return Math.trunc(Date.now() / 1000) - 15;
}

function getShare(value: BigNumberish, streamDuration: BigNumberish, ownedDuration: BigNumberish): BigNumber {
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
  const elapsedDuration = BigNumber.from(cancellationTime || getNow()).sub(startTime);
  return getShare(value, streamDuration, elapsedDuration);
}

export function getRecipientShareAsPercentage(
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
  const remainingDuration = BigNumber.from(endTime).sub(cancellationTime || getNow());
  return getShare(value, streamDuration, remainingDuration);
}

export function getStreamStatus(stream: Stream): StreamStatus {
  const { cancellation, startTime, stopTime } = stream;
  if (cancellation !== null) {
    return StreamStatus.Cancelled;
  }
  if (isFuture(new Date(startTime * 1000))) {
    return StreamStatus.Created;
  }
  if (isPast(new Date(stopTime * 1000))) {
    return StreamStatus.Ended;
  }
  return StreamStatus.Streaming;
}

export function getStreamWithdrawableAmount(stream: Stream): BigNumber {
  const { deposit, startTime, stopTime, withdrawals } = stream;
  const withdrawnBalance = withdrawals.reduce((accumulator, { amount }) => {
    return accumulator.add(amount);
  }, Zero);
  return getRecipientShare(deposit, startTime, stopTime).sub(withdrawnBalance);
}
