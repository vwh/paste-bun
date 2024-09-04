import type { Period } from "../types";

export const getNowTime = () => Date.now() + 1000 * 60 * 60;

export const getExpireTime = (period: Period) => {
  const baseDate = getNowTime();
  switch (period) {
    case "day":
      return baseDate + 1000 * 60 * 60 * 24; // One day in milliseconds
    case "week":
      return baseDate + 1000 * 60 * 60 * 24 * 7; // One week in milliseconds
    case "month":
      return baseDate + 1000 * 60 * 60 * 24 * 30; // One month in milliseconds
    default:
      return baseDate + 1000 * 60 * 60 * 24 * 30; // One month in milliseconds
  }
};
