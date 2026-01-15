import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";

export async function loadLogo(pdfDoc: PDFDocument) {
  const logoPath = path.join(process.cwd(), 
  "src/engine/assets/clini-logo.png"
);

  const logoBytes = fs.readFileSync(logoPath);
  return await pdfDoc.embedPng(logoBytes);
}
