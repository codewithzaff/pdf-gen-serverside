import { PDFDocument, PDFImage } from "pdf-lib";

export async function embedPngImage(
  pdfDoc: PDFDocument,
  imageBytes: Uint8Array | Buffer
): Promise<PDFImage> {
  return await pdfDoc.embedPng(imageBytes);
}
