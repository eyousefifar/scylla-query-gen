import { timeToSeconds } from "../src/query/timeToSeconds";

describe("timeToSeconds", () => {
  it("should return 0 when no time is given", () => {
    expect(timeToSeconds({})).toBe(0);
  });
  it("should return correct time based on parameter", () => {
    expect(timeToSeconds({ hours: 1 })).toBe(3600);
    expect(timeToSeconds({ minutes: 1 })).toBe(60);
    expect(timeToSeconds({ seconds: 1 })).toBe(1);
    expect(timeToSeconds({ hours: 1, minutes: 1, seconds: 1 })).toBe(3661);
  });
});
