import { PDFPage } from "pdf-lib";

/**
 * Draw student photo below header
 * ✅ SAFE
 * ✅ NO CRASH
 * ✅ SILENT FAIL
 */
export function drawStudentIdentity({
  page,
  image,
  y,
}: {
  page: PDFPage;
  image?: any;
  y: number;
}) {
  if (!image) return;

  const size = image.scale(0.25);

  page.drawImage(image, {
    x: 50,
    y: y - size.height,
    width: size.width,
    height: size.height,
  });
}
