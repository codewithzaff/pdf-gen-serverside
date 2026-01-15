import { rgb } from "pdf-lib";
import { theme } from "../theme/theme";

export function drawFooter(
  page: any,
  fonts: any,
  pageNumber: number,
  totalPages: number
) {
  if (!fonts?.regular?.font) {
    throw new Error("drawFooter(): fonts.regular.font is missing");
  }

  const { width } = page.getSize();

  page.drawText(`Page ${pageNumber} of ${totalPages}`, {
    x: width / 2 - 30,
    y: theme.page.margin / 2,
    size: 9,
    font: fonts.regular.font,
    color: rgb(0.4, 0.4, 0.4),
  });
}
