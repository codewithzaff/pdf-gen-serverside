import { rgb } from "pdf-lib";
import { theme } from "../theme/theme";

export function drawSectionTitle(
  page: any,
  fonts: any,
  title: string,
  y: number
) {
  if (!fonts?.bold?.font) {
    throw new Error("drawSectionTitle(): fonts.bold.font missing");
  }

  if (typeof y !== "number" || Number.isNaN(y)) {
    throw new Error(`drawSectionTitle(): invalid y = ${y}`);
  }

  page.drawText(title, {
    x: theme.page.margin,
    y,
    size: 12,
    font: fonts.bold.font, // ✅ THIS IS THE FIX
    color: rgb(0.1, 0.1, 0.1),
  });
}
