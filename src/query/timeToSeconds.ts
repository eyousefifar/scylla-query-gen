import type { ITTL } from "../types";
export function timeToSeconds(time: ITTL): number {
  let sec = 0;
  const { hours, minutes, seconds } = time;
  if (hours) {
    sec += hours * 3600;
  }
  if (minutes) {
    sec += minutes * 60;
  }
  if (seconds) {
    sec += seconds;
  }
  return sec;
}