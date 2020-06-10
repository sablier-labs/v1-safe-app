import { formatUnits } from "@ethersproject/units";

export function bigNumberToHumanFormat(value: string, tokenDecimals: number, displayDecimals: number = 4): string {
  let scaledNumber = formatUnits(value, tokenDecimals);

  /*
   *Pad with zeros for required decimal places
   * Note: `formatUnits` always returns a decimal point
   */
  scaledNumber = scaledNumber.padEnd(scaledNumber.indexOf(".") + displayDecimals + 1, "0");
  /* Trim any excess decimal places */
  return scaledNumber.slice(0, scaledNumber.indexOf(".") + displayDecimals + 1);
}
