import { rgb } from "pdf-lib";
import { theme } from "../theme/theme";

export function drawRow(
  page: any,
  fonts: any,
  label: string,
  value: any,
  y: number
) {
  const labelFont = fonts?.bold?.font;
  const valueFont = fonts?.regular?.font;

  if (!labelFont || !valueFont) {
    throw new Error("drawRow(): fonts are not loaded correctly");
  }

  const labelX = theme.page.margin;
  const valueX = theme.page.margin + 160;
  const maxWidth =
    page.getSize().width - valueX - theme.page.margin;

  const safeValue =
    value === undefined || value === null || value === ""
      ? "-"
      : String(value);

  // Label
  page.drawText(label, {
    x: labelX,
    y,
    size: 10,
    font: labelFont,
    color: rgb(0.05, 0.2, 0.45), // dark blue
  });

  // Value (wrapped)
  page.drawText(safeValue, {
    x: valueX,
    y,
    size: 10,
    font: valueFont,
    color: rgb(0.15, 0.15, 0.15),
    maxWidth,
    lineHeight: 14,
  });
}
