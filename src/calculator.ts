export type CalculationResult = {
  value: number;
  unit: string;
  formula: string;
};

function assertPositive(value: number, label: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${label}は0より大きい数値を入力してください。`);
  }
}

export function calculateMassPercent(
  soluteMassG: number,
  solutionMassG: number,
): CalculationResult {
  assertPositive(soluteMassG, "溶質の質量");
  assertPositive(solutionMassG, "溶液の質量");

  if (soluteMassG > solutionMassG) {
    throw new Error("溶質の質量は溶液の質量以下にしてください。");
  }

  return {
    value: (soluteMassG / solutionMassG) * 100,
    unit: "%",
    formula: "質量パーセント濃度 = 溶質の質量 ÷ 溶液の質量 × 100",
  };
}

export function calculateDilutionVolume(
  initialConcentration: number,
  initialVolumeMl: number,
  targetConcentration: number,
): CalculationResult {
  assertPositive(initialConcentration, "元の濃度");
  assertPositive(initialVolumeMl, "元の体積");
  assertPositive(targetConcentration, "目標濃度");

  if (targetConcentration >= initialConcentration) {
    throw new Error("目標濃度は元の濃度より小さくしてください。");
  }

  const finalVolumeMl =
    (initialConcentration * initialVolumeMl) / targetConcentration;

  return {
    value: finalVolumeMl - initialVolumeMl,
    unit: "mL",
    formula: "C₁V₁ = C₂V₂（追加する水 = V₂ − V₁）",
  };
}
