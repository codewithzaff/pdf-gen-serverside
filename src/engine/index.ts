import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";
import { loadFonts } from "./fonts/loadFonts";
import { drawAdmissionTemplate } from "./templates/admissionTemplate";
import { drawFooter } from "./layout/footer";

export async function createAdmissionPdf(data: any) {
  const pdfDoc = await PDFDocument.create();

 
  const fonts = await loadFonts(pdfDoc);


  let logo;
  try {
    const logoPath = path.join(
      __dirname,
      "assets",
      "clini-logo.png"
    );

    const logoBytes = fs.readFileSync(logoPath);
    logo = await pdfDoc.embedPng(logoBytes);
  } catch (err) {
    console.warn("Logo not loaded, continuing without logo");
  }

  /* ================= CONTENT ================= */
  drawAdmissionTemplate(pdfDoc, fonts, data, logo);

  /* ================= FOOTER ================= */
  const pages = pdfDoc.getPages();
  pages.forEach((page, index) => {
    drawFooter(page, fonts, index + 1, pages.length);
  });

  return await pdfDoc.save();
}
