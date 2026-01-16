import { rgb } from "pdf-lib";
import { theme } from "../theme/theme";

export function drawSectionTitle(
  page: any,
  fonts: any,
  title: string,
  y: number
) {
  const font = fonts?.bold?.font;

  if (!font) {
    throw new Error("drawSectionTitle(): bold font missing");
  }

  page.drawText(title.toUpperCase(), {
    x: theme.page.margin,
    y,
    size: 12,
    font,
    color: rgb(0.05, 0.2, 0.45), // professional dark blue
  });
}
