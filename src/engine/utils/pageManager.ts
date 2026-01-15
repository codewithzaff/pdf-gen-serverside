import { PDFDocument, PDFPage } from "pdf-lib";
import { theme } from "../theme/theme";
import { drawHeader } from "../layout/header";

export function createPageManager(
  pdfDoc: PDFDocument,
  fonts: any,
  logo?: any,
  meta?: { studentId?: string }
) {
  const pageHeight = theme.page.height ?? 842;
  const headerHeight = theme.page.headerHeight ?? 110;
  const margin = theme.page.margin ?? 50;

  let page: PDFPage = pdfDoc.addPage();
  let y = pageHeight - headerHeight;

  drawHeader(page, fonts, logo, meta);

  function newPage() {
    page = pdfDoc.addPage();
    drawHeader(page, fonts, logo, meta);
    y = pageHeight - headerHeight;
  }

  function ensureSpace(height: number) {
    if (typeof height !== "number" || Number.isNaN(height)) {
      throw new Error(`❌ Invalid height passed to ensureSpace: ${height}`);
    }

    if (y - height < margin) {
      newPage();
    }
  }

  function draw(
    drawFn: (page: PDFPage, y: number) => void,
    height: number
  ) {
    ensureSpace(height);
    drawFn(page, y);
    y -= height;
  }

  function space(height: number) {
    ensureSpace(height);
    y -= height;
  }

  return {
    draw,
    space,
  };
}
