import { rgb } from "pdf-lib";
import { theme } from "../theme/theme";

type HeaderMeta = {
  studentId?: string;
};

export function drawHeader(
  page: any,
  fonts: any,
  logo?: any,
  meta?: HeaderMeta
) {
  if (!fonts?.bold?.font || !fonts?.regular?.font) {
    throw new Error("drawHeader(): fonts.bold.font or fonts.regular.font missing");
  }

  const { width, height } = page.getSize();

  // Background strip
  page.drawRectangle({
    x: 0,
    y: height - 70,
    width,
    height: 70,
    color: rgb(0.95, 0.97, 1),
  });

  // Logo
  if (logo) {
    page.drawImage(logo, {
      x: theme.page.margin,
      y: height - 60,
      width: 110,
      height: 50,
    });
  }

  const textX = logo
    ? theme.page.margin + 130
    : theme.page.margin;

  // Institute name
  page.drawText("CLINILAUNCH ELECTRONIC APPLICATION CENTER", {
    x: textX,
    y: height - 32,
    size: 14,
    font: fonts.bold.font,
    color: rgb(0, 0, 0),
  });

  // Student ID
  if (meta?.studentId) {
    page.drawText(`Student ID: ${meta.studentId}`, {
      x: textX,
      y: height - 50,
      size: 9,
      font: fonts.regular.font,
      color: rgb(0.3, 0.3, 0.3),
    });
  }
}
