// src/engine/fonts/loadFonts.ts
import fs from "fs";
import path from "path";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument } from "pdf-lib";

export async function loadFonts(pdfDoc: PDFDocument) {
  pdfDoc.registerFontkit(fontkit);

  const regularPath = path.resolve(__dirname, "Roboto-Regular.ttf");
  const boldPath = path.resolve(__dirname, "Roboto-Bold.ttf");

  const regularFont = await pdfDoc.embedFont(
    fs.readFileSync(regularPath)
  );
  const boldFont = await pdfDoc.embedFont(
    fs.readFileSync(boldPath)
  );

  return {
    regular: { font: regularFont, size: 10 },
    bold: { font: boldFont, size: 12 },
  };
}
