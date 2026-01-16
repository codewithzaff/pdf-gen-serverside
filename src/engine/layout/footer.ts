import { rgb } from "pdf-lib";
import { theme } from "../theme/theme";

export function drawFooter(
  page: any,
  fonts: any,
  pageNumber: number,
  totalPages: number
) {
  const font = fonts?.regular?.font;

  if (!font) {
    throw new Error("drawFooter(): regular font missing");
  }

  const { width } = page.getSize();

  page.drawText(`Page ${pageNumber} of ${totalPages}`, {
    x: width / 2 - 30,
    y: theme.page.margin - 20,
    size: 9,
    font,
    color: rgb(0.4, 0.4, 0.4),
  });
}
