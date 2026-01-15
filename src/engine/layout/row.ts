// src/engine/layout/row.ts
import { rgb } from "pdf-lib";
import { theme } from "../theme/theme";

export function drawRow(
  page: any,
  fonts: any,
  label: string,
  value: string,
  y: number
) {
  // 🔒 HARD GUARDS (this prevents silent corruption)
  if (!fonts?.regular?.font) {
    throw new Error("drawRow(): fonts.regular.font is missing");
  }

  if (typeof y !== "number" || Number.isNaN(y)) {
    throw new Error(`drawRow(): invalid y = ${y}`);
  }

  const labelX = theme.page.margin;
  const valueX = theme.page.margin + 160;

  // Label
  page.drawText(label, {
    x: labelX,
    y,
    size: fonts.regular.size ?? 10,
    font: fonts.regular.font, // ✅ THIS IS THE FIX
    color: rgb(0.3, 0.3, 0.3),
  });

  // Value
  page.drawText(value ?? "-", {
    x: valueX,
    y,
    size: fonts.regular.size ?? 10,
    font: fonts.regular.font, // ✅ THIS IS THE FIX
    color: rgb(0, 0, 0),
    maxWidth: theme.page.width - valueX - theme.page.margin,
  });
}
