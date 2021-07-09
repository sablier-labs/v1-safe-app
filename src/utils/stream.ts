import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";

import { ProxyStream } from "../types";

function currentUnixTimestamp() {
  return Math.trunc(Date.now() / 1000);
}

function userShare(value: BigNumberish, streamDuration: BigNumberish, ownedDuration: BigNumberish): BigNumber {
  if (BigNumber.from(ownedDuration).lte("0")) return BigNumber.from("0");
  if (BigNumber.from(ownedDuration).gte(streamDuration)) return BigNumber.from(value);
  return BigNumber.from(value).mul(ownedDuration).div(streamDuration);
}

export function recipientShare(
  value: BigNumberish,
  startTime: BigNumberish,
  endTime: BigNumberish,
  cancellationTime?: BigNumberish,
): BigNumber {
  const streamDuration = BigNumber.from(endTime).sub(startTime);
  const elapsedDuration = BigNumber.from(cancellationTime || currentUnixTimestamp()).sub(startTime);
  return userShare(value, streamDuration, elapsedDuration);
}

export function senderShare(
  value: BigNumberish,
  startTime: BigNumberish,
  endTime: BigNumberish,
  cancellationTime?: BigNumberish,
): BigNumber {
  const streamDuration = BigNumber.from(endTime).sub(startTime);
  const remainingDuration = BigNumber.from(endTime).sub(cancellationTime || currentUnixTimestamp());
  return userShare(value, streamDuration, remainingDuration);
}

export function percentageProgress(
  startTime: BigNumberish,
  endTime: BigNumberish,
  cancellationTime?: BigNumberish,
): number {
  return recipientShare(10000, startTime, endTime, cancellationTime).toNumber() / 100;
}

export function streamAvailableBalance(proxyStream: ProxyStream): BigNumber {
  const { deposit, startTime, stopTime, withdrawals } = proxyStream.stream;
  const withdrawnBalance = withdrawals.reduce((accumulator, { amount }) => accumulator.add(amount), Zero);
  return recipientShare(deposit, startTime, stopTime).sub(withdrawnBalance);
}
