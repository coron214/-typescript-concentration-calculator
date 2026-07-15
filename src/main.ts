import "./style.css";
import {
  calculateDilutionVolume,
  calculateMassPercent,
  type CalculationResult,
} from "./calculator";

const app = document.querySelector<HTMLElement>("#app");

if (!app) {
  throw new Error("#app が見つかりません。");
}

app.innerHTML = `
  <section class="hero">
    <p class="eyebrow">TypeScript Mini App</p>
    <h1>濃度・希釈計算ツール</h1>
    <p>質量パーセント濃度と、希釈に必要な水の量を計算できます。</p>
  </section>

  <section class="grid">
    <form id="mass-percent-form" class="card">
      <h2>質量パーセント濃度</h2>
      <label>溶質の質量（g）<input name="solute" type="number" min="0" step="any" required /></label>
      <label>溶液の質量（g）<input name="solution" type="number" min="0" step="any" required /></label>
      <button type="submit">濃度を計算</button>
      <output id="mass-percent-result" class="result" aria-live="polite"></output>
    </form>

    <form id="dilution-form" class="card">
      <h2>希釈に必要な水の量</h2>
      <label>元の濃度（%）<input name="initialConcentration" type="number" min="0" step="any" required /></label>
      <label>元の体積（mL）<input name="initialVolume" type="number" min="0" step="any" required /></label>
      <label>目標濃度（%）<input name="targetConcentration" type="number" min="0" step="any" required /></label>
      <button type="submit">水の量を計算</button>
      <output id="dilution-result" class="result" aria-live="polite"></output>
    </form>
  </section>
`;

function readNumber(form: FormData, key: string): number {
  return Number(form.get(key));
}

function showResult(element: HTMLOutputElement, result: CalculationResult): void {
  element.classList.remove("error");
  element.innerHTML = `<strong>${result.value.toFixed(2)} ${result.unit}</strong><small>${result.formula}</small>`;
}

function showError(element: HTMLOutputElement, error: unknown): void {
  element.classList.add("error");
  element.textContent = error instanceof Error ? error.message : "計算に失敗しました。";
}

const massForm = document.querySelector<HTMLFormElement>("#mass-percent-form");
const massResult = document.querySelector<HTMLOutputElement>("#mass-percent-result");
const dilutionForm = document.querySelector<HTMLFormElement>("#dilution-form");
const dilutionResult = document.querySelector<HTMLOutputElement>("#dilution-result");

massForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!massResult) return;

  const data = new FormData(massForm);
  try {
    showResult(
      massResult,
      calculateMassPercent(readNumber(data, "solute"), readNumber(data, "solution")),
    );
  } catch (error) {
    showError(massResult, error);
  }
});

dilutionForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!dilutionResult) return;

  const data = new FormData(dilutionForm);
  try {
    showResult(
      dilutionResult,
      calculateDilutionVolume(
        readNumber(data, "initialConcentration"),
        readNumber(data, "initialVolume"),
        readNumber(data, "targetConcentration"),
      ),
    );
  } catch (error) {
    showError(dilutionResult, error);
  }
});
