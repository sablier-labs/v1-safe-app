import { BigNumber } from "@ethersproject/bignumber";

export const ISO_8601_FORMAT = "DD MMM YYYY @ h:mma";
export const ISO_8601_FORMAT_DAY = "DD MMM YYYY";
export const ISO_8601_FORMAT_MONTH = "MMM YYYY";
export const ISO_8601_FORMAT_HOUR = "DD MMM YYYY @ h:00a";

export const SECONDS_IN_MINUTE: number = 60;
export const SECONDS_IN_HOUR: number = 3600;
export const SECONDS_IN_DAY: number = 86400;
export const SECONDS_IN_WEEK: number = 604800;
export const SECONDS_IN_MONTH: number = 2592000; // 30 days

/* Measured in milliseconds */
export const SLIDE_DURATION: number = 250;

export const DATE_FORMAT = "MMM D, YYYY";
export const TIME_FORMAT = "HH:mm";
export const TIME_FORMAT_DEFAULT = "00:00";

export function getSecondsForDays(days?: number) {
  if (days === 0) {
    return 0;
  }
  const daysBn = BigNumber.from(days);
  const secondsBn = daysBn.mul(SECONDS_IN_DAY);
  return secondsBn.toNumber();
}

export function getSecondsForHours(hours?: number) {
  if (hours === 0) {
    return 0;
  }
  const hoursBn = BigNumber.from(hours);
  const secondsBn = hoursBn.mul(SECONDS_IN_HOUR);
  return secondsBn.toNumber();
}

export function getSecondsForMinutes(minutes?: number) {
  if (minutes === 0) {
    return 0;
  }
  const minutesBn = BigNumber.from(minutes);
  const secondsBn = minutesBn.mul(SECONDS_IN_MINUTE);
  return secondsBn.toNumber();
}
