import { formatUnits } from "@ethersproject/units";
import { BigNumberish } from "@ethersproject/bignumber";

export function bigNumberToHumanFormat(
  value: BigNumberish,
  tokenDecimals: number,
  displayDecimals: number = 4,
): string {
  let scaledNumber = formatUnits(value, tokenDecimals);

  /*
   *Pad with zeros for required decimal places
   * Note: `formatUnits` always returns a decimal point
   */
  scaledNumber = scaledNumber.padEnd(scaledNumber.indexOf(".") + displayDecimals + 1, "0");
  /* Trim any excess decimal places */
  return scaledNumber.slice(0, scaledNumber.indexOf(".") + displayDecimals + 1);
}

export const BigNumberToRoundedHumanFormat = (
  value: BigNumberish,
  tokenDecimals: number,
  displayDecimals: number = 4,
) =>
  // Truncate to one decimal more than displaying to ensure that rounding is accurate
  parseFloat(bigNumberToHumanFormat(value, tokenDecimals, displayDecimals + 1)).toFixed(displayDecimals);
