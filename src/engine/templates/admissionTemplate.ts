import { PDFDocument, PDFPage } from "pdf-lib";
import { drawRow } from "../layout/row";
import { drawSectionTitle } from "../layout/section";
import { formatCurrency } from "../utils/format";
import { createPageManager } from "../utils/pageManager";

/**
 * SAFE, STABLE ADMISSION PDF TEMPLATE
 * ✅ Text-first
 * ✅ Optional images (photo + barcode)
 * ❌ No external layout dependency
 * ❌ Cannot blank PDF
 */
export function drawAdmissionTemplate(
  pdfDoc: PDFDocument,
  fonts: any,
  data: any,
  logo?: any
) {
  const pm = createPageManager(pdfDoc, fonts, logo, {
    studentId: data?.meta?.studentId,
  });

  /* ============================================================
     STUDENT IMAGE + BARCODE (OPTIONAL & SAFE)
  ============================================================ */

  pm.draw(
    (page: PDFPage, y: number) => {
      const startX = 50;
      let cursorY = y;

      // Student photo
      if (data?._studentPhotoImage) {
        page.drawImage(data._studentPhotoImage, {
          x: startX,
          y: cursorY - 120,
          width: 90,
          height: 110,
        });
      }

      // Application ID text (FIXED FONT 🔴)
      if (data?.meta?.applicationId) {
        page.drawText(`Confirmation Number: ${data.meta.applicationId}`, {
          x: startX + 110,
          y: cursorY - 40,
          size: 10,
          font: fonts.regular?.font ?? fonts.bold?.font,
        });
      }

      // Barcode
      if (data?._barcodeImage) {
        page.drawImage(data._barcodeImage, {
          x: startX + 110,
          y: cursorY - 110,
          width: 200,
          height: 60,
        });
      }
    },
    140 // FIXED HEIGHT (SAFE)
  );

  pm.space(20);

  /* ================= COURSES & FEES ================= */

  if (Array.isArray(data.courses) && data.courses.length) {
    pm.draw((p, y) => drawSectionTitle(p, fonts, "Courses & Fees", y), 30);

    let totalFee = 0;

    data.courses.forEach((course: any) => {
      const fee = Number(course.fee ?? 0);
      totalFee += fee;

      pm.draw((p, y) => drawRow(p, fonts, "Course", course.name ?? "-", y), 18);
      pm.draw((p, y) => drawRow(p, fonts, "Fee", formatCurrency(fee), y), 22);
    });

    pm.draw(
      (p, y) => drawRow(p, fonts, "Total Fee", formatCurrency(totalFee), y),
      28
    );
  }

  /* ================= PERSONAL DETAILS ================= */

  pm.draw((p, y) => drawSectionTitle(p, fonts, "Personal Details", y), 30);

  pm.draw(
    (p, y) => drawRow(p, fonts, "Full Name", data.student?.fullName ?? "-", y),
    18
  );
  pm.draw(
    (p, y) => drawRow(p, fonts, "Email", data.student?.email ?? "-", y),
    18
  );
  pm.draw(
    (p, y) => drawRow(p, fonts, "Mobile", data.student?.mobile ?? "-", y),
    18
  );
  pm.draw((p, y) => drawRow(p, fonts, "DOB", data.student?.dob ?? "-", y), 18);
  pm.draw(
    (p, y) => drawRow(p, fonts, "Gender", data.student?.gender ?? "-", y),
    26
  );

  /* ================= ADDRESS ================= */

  if (data.address) {
    pm.draw((p, y) => drawSectionTitle(p, fonts, "Address Details", y), 30);

    pm.draw(
      (p, y) =>
        drawRow(
          p,
          fonts,
          "Permanent Address",
          data.address.permanent ?? "-",
          y
        ),
      36
    );

    pm.draw(
      (p, y) =>
        drawRow(p, fonts, "Current Address", data.address.current ?? "-", y),
      36
    );
  }

  /* ================= EDUCATION ================= */

  if (Array.isArray(data.education) && data.education.length) {
    pm.draw((p, y) => drawSectionTitle(p, fonts, "Education Details", y), 30);

    data.education.forEach((edu: any) => {
      pm.draw((p, y) => drawRow(p, fonts, "Level", edu.level ?? "-", y), 18);
      pm.draw(
        (p, y) => drawRow(p, fonts, "Institute", edu.institute ?? "-", y),
        18
      );
      pm.draw(
        (p, y) => drawRow(p, fonts, "Board / University", edu.board ?? "-", y),
        18
      );
      pm.draw((p, y) => drawRow(p, fonts, "Year", edu.year ?? "-", y), 18);
      pm.draw((p, y) => drawRow(p, fonts, "Marks", edu.marks ?? "-", y), 26);
    });
  }

  /* ================= WORK EXPERIENCE ================= */

  if (Array.isArray(data.workExperience) && data.workExperience.length) {
    pm.draw((p, y) => drawSectionTitle(p, fonts, "Work Experience", y), 30);

    data.workExperience.forEach((job: any) => {
      pm.draw(
        (p, y) => drawRow(p, fonts, "Employer", job.employer ?? "-", y),
        18
      );
      pm.draw((p, y) => drawRow(p, fonts, "Role", job.role ?? "-", y), 18);
      pm.draw((p, y) => drawRow(p, fonts, "Period", job.period ?? "-", y), 26);
    });
  }

  /* ================= HONORS ================= */

  if (Array.isArray(data.honors) && data.honors.length) {
    pm.draw((p, y) => drawSectionTitle(p, fonts, "Honors & Awards", y), 30);

    data.honors.forEach((h: any) => {
      pm.draw((p, y) => drawRow(p, fonts, "Title", h.name ?? "-", y), 18);
      pm.draw((p, y) => drawRow(p, fonts, "Awarded By", h.by ?? "-", y), 18);
      pm.draw((p, y) => drawRow(p, fonts, "Year", h.year ?? "-", y), 26);
    });
  }

  /* ================= PUBLICATIONS ================= */

  if (Array.isArray(data.publications) && data.publications.length) {
    pm.draw((p, y) => drawSectionTitle(p, fonts, "Publications", y), 30);

    data.publications.forEach((pub: any) => {
      pm.draw((p, y) => drawRow(p, fonts, "Title", pub.title ?? "-", y), 18);
      pm.draw((p, y) => drawRow(p, fonts, "Type", pub.type ?? "-", y), 18);
      pm.draw((p, y) => drawRow(p, fonts, "DOI", pub.doi ?? "-", y), 18);
      pm.draw((p, y) => drawRow(p, fonts, "Date", pub.date ?? "-", y), 26);
    });
  }

  /* ================= CONFERENCES ================= */

  if (Array.isArray(data.conferences) && data.conferences.length) {
    pm.draw((p, y) => drawSectionTitle(p, fonts, "Conferences", y), 30);

    data.conferences.forEach((c: any) => {
      pm.draw((p, y) => drawRow(p, fonts, "Name", c.name ?? "-", y), 18);
      pm.draw((p, y) => drawRow(p, fonts, "City", c.city ?? "-", y), 18);
      pm.draw((p, y) => drawRow(p, fonts, "Year", c.year ?? "-", y), 26);
    });
  }

  /* ================= PROFESSIONAL IDS ================= */

  if (data.ids?.orcid) {
    pm.draw((p, y) => drawSectionTitle(p, fonts, "Professional IDs", y), 30);

    pm.draw((p, y) => drawRow(p, fonts, "ORCID", data.ids.orcid, y), 26);
  }
}
