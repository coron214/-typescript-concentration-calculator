import { describe, expect, it } from "vitest";
import { calculateDilutionVolume, calculateMassPercent } from "../src/calculator";

describe("calculateMassPercent", () => {
  it("質量パーセント濃度を計算できる", () => {
    expect(calculateMassPercent(20, 200).value).toBe(10);
  });

  it("溶質が溶液より重い場合はエラーにする", () => {
    expect(() => calculateMassPercent(120, 100)).toThrow();
  });
});

describe("calculateDilutionVolume", () => {
  it("希釈に必要な水の量を計算できる", () => {
    expect(calculateDilutionVolume(10, 100, 5).value).toBe(100);
  });

  it("目標濃度が元の濃度以上の場合はエラーにする", () => {
    expect(() => calculateDilutionVolume(5, 100, 10)).toThrow();
  });
});
