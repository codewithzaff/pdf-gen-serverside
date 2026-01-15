import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";
import { loadFonts } from "./fonts/loadFonts";
import { drawAdmissionTemplate } from "./templates/admissionTemplate";
import { drawFooter } from "./layout/footer";

export async function createAdmissionPdf(data: any) {
  console.log("🧩 PDF DATA KEYS:", Object.keys(data || {}));
console.log("🧩 personalDetails:", data?.personalDetails);
console.log("🧩 full data snapshot:", JSON.stringify(data, null, 2));

  const pdfDoc = await PDFDocument.create();

  const fonts = await loadFonts(pdfDoc);

  /* ================= LOGO ================= */
  let logo;
  try {
    const logoPath = path.join(__dirname, "assets", "clini-logo.png");
    const logoBytes = fs.readFileSync(logoPath);
    logo = await pdfDoc.embedPng(logoBytes);
  } catch {
    console.warn("⚠️ Logo not loaded, continuing without logo");
  }

  // ================= STUDENT PHOTO EMBEDDING =================

if (typeof data.profileImagePreview === "string" &&
    data.profileImagePreview.startsWith("data:image")) {

  try {
    console.log("🖼️ Student photo resolved to: FOUND");

    const base64 = data.profileImagePreview.split(",")[1];
    const imageBytes = Buffer.from(base64, "base64");

    // auto-detect image type
    if (data.profileImagePreview.includes("image/png")) {
      data._studentPhotoImage = await pdfDoc.embedPng(imageBytes);
    } else {
      data._studentPhotoImage = await pdfDoc.embedJpg(imageBytes);
    }

    console.log("✅ Student image embedded into PDF");

  } catch (err) {
    console.warn("⚠️ Failed to embed student photo:", err);
  }

} else {
  console.warn("⚠️ No valid base64 student image found");
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
