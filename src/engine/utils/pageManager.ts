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
  const HEADER_BOTTOM_GAP = 24;

  let page: PDFPage = pdfDoc.addPage();
  let y = pageHeight - headerHeight - HEADER_BOTTOM_GAP;

  drawHeader(page, fonts, logo, meta);

  function newPage() {
    page = pdfDoc.addPage();
    drawHeader(page, fonts, logo, meta);
    y = pageHeight - headerHeight - HEADER_BOTTOM_GAP;
  }

  function ensureSpace(height: number) {
    // ✅ Absolute safety guard
    if (typeof height !== "number" || !Number.isFinite(height)) {
      throw new Error(` Invalid height passed to ensureSpace: ${height}`);
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
