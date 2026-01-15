import { PDFDocument } from "pdf-lib";
import { loadFonts } from "./fonts/loadFonts";
import { drawAdmissionTemplate } from "./templates/admissionTemplate";
import { drawFooter } from "./layout/footer";

export async function createAdmissionPdf(data: any, logo?: any) {
  const pdfDoc = await PDFDocument.create();

  const fonts = await loadFonts(pdfDoc);

  drawAdmissionTemplate(pdfDoc, fonts, data, logo);

  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    drawFooter(page, fonts, index + 1, pages.length);
  });

  return await pdfDoc.save();
}
