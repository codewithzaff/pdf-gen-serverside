import { rgb } from "pdf-lib";
import { theme } from "../theme/theme";

export function drawHeader(
  page: any,
  fonts: any,
  logo?: any,
  meta?: { studentId?: string }
) {
  const { width, height } = page.getSize();

  const boldFont = fonts?.bold?.font;
  const regularFont = fonts?.regular?.font;

  if (!boldFont || !regularFont) {
    throw new Error("drawHeader(): fonts not loaded");
  }

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
      y: height - 50 - 10,
      width: 110,
      height: 45,
    });
  }

  // Institute name (STATIC → SAFE)
  page.drawText("CLINILAUNCH ELECTRONIC APPLICATION CENTER", {
    x: theme.page.margin + 130,
    y: height - 32,
    size: 14,
    font: boldFont,
    color: rgb(0.05, 0.2, 0.45),
  });

  // Student ID (DYNAMIC → MUST BE STRING)
  const studentIdText = meta?.studentId
    ? `Student ID: ${String(meta.studentId)}`
    : "Student ID: -";

  page.drawText(studentIdText, {
    x: theme.page.margin + 130,
    y: height - 50,
    size: 10,
    font: regularFont,
    color: rgb(0.35, 0.35, 0.35),
  });
}
