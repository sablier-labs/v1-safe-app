import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import moment from "moment";

const userShare = (value: BigNumberish, streamDuration: BigNumberish, ownedDuration: BigNumberish): BigNumber => {
  if (BigNumber.from(ownedDuration).lte("0")) return BigNumber.from("0");
  if (BigNumber.from(ownedDuration).gte(streamDuration)) return BigNumber.from(value);
  return BigNumber.from(value)
    .mul(ownedDuration)
    .div(streamDuration);
};

export const recipientShare = (
  value: BigNumberish,
  startTime: BigNumberish,
  endTime: BigNumberish,
  cancellationTime?: BigNumberish,
): BigNumber => {
  const streamDuration = BigNumber.from(endTime).sub(startTime);
  const elapsedDuration = BigNumber.from(cancellationTime || moment().format("X")).sub(startTime);
  return userShare(value, streamDuration, elapsedDuration);
};

export const senderShare = (
  value: BigNumberish,
  startTime: BigNumberish,
  endTime: BigNumberish,
  cancellationTime?: BigNumberish,
): BigNumber => {
  const streamDuration = BigNumber.from(endTime).sub(startTime);
  const remainingDuration = BigNumber.from(endTime).sub(cancellationTime || moment().format("X"));
  return userShare(value, streamDuration, remainingDuration);
};

export const percentageProgress = (startTime: BigNumberish, endTime: BigNumberish, cancellationTime?: BigNumberish) =>
  recipientShare(10000, startTime, endTime, cancellationTime).toNumber() / 100;
