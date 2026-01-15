import { drawRow } from "../layout/row";
import { drawSectionTitle } from "../layout/section";
import { formatCurrency } from "../utils/format";
import { createPageManager } from "../utils/pageManager";

export function drawAdmissionTemplate(
  pdfDoc: any,
  fonts: any,
  data: any,
  logo: any
) {
  const pm = createPageManager(pdfDoc, fonts, logo, {
    studentId: data?.meta?.studentId,
  });

  /* ================= PERSONAL DETAILS ================= */

  pm.draw(
    (p, y) => drawSectionTitle(p, fonts, "Personal Details", y),
    28
  );

  pm.draw((p, y) => drawRow(p, fonts, "Full Name", data.student?.fullName, y), 16);
  pm.draw((p, y) => drawRow(p, fonts, "Email", data.student?.email, y), 16);
  pm.draw((p, y) => drawRow(p, fonts, "Mobile", data.student?.mobile, y), 22);

  /* ================= ADDRESS ================= */

  pm.draw(
    (p, y) => drawSectionTitle(p, fonts, "Address Details", y),
    32
  );

  pm.draw(
    (p, y) => drawRow(p, fonts, "Permanent Address", data.address?.permanent, y, true),
    36
  );

  pm.draw(
    (p, y) => drawRow(p, fonts, "Current Address", data.address?.current, y, true),
    36
  );

  /* ================= EDUCATION ================= */

  if (data.education?.length) {
    pm.draw(
      (p, y) => drawSectionTitle(p, fonts, "Education Details", y),
      32
    );

    data.education.forEach((edu: any) => {
      pm.draw((p, y) => drawRow(p, fonts, "Level", edu.level, y), 16);
      pm.draw((p, y) => drawRow(p, fonts, "Institute", edu.institute, y), 16);
      pm.draw((p, y) => drawRow(p, fonts, "Board", edu.board, y), 16);
      pm.draw((p, y) => drawRow(p, fonts, "Year", edu.year, y), 16);
      pm.draw((p, y) => drawRow(p, fonts, "Marks", edu.marks, y), 22);
    });
  }

  /* ================= WORK EXPERIENCE ================= */

  if (data.workExperience?.length) {
    pm.draw(
      (p, y) => drawSectionTitle(p, fonts, "Work Experience", y),
      32
    );

    data.workExperience.forEach((job: any) => {
      pm.draw((p, y) => drawRow(p, fonts, "Employer", job.employer, y), 16);
      pm.draw((p, y) => drawRow(p, fonts, "Role", job.role, y), 16);
      pm.draw((p, y) => drawRow(p, fonts, "Period", job.period, y), 22);
    });
  }

  /* ================= COURSES ================= */

  if (data.courses?.length) {
    pm.draw(
      (p, y) => drawSectionTitle(p, fonts, "Courses & Fees", y),
      32
    );

    let total = 0;

    data.courses.forEach((c: any) => {
      total += c.fee;
      pm.draw((p, y) => drawRow(p, fonts, "Course", c.name, y), 16);
      pm.draw((p, y) => drawRow(p, fonts, "Fee", formatCurrency(c.fee), y), 22);
    });

    pm.draw(
      (p, y) => drawRow(p, fonts, "Total Fee", formatCurrency(total), y),
      26
    );
  }

  /* ================= HONORS ================= */

  if (data.honors?.length) {
    pm.draw(
      (p, y) => drawSectionTitle(p, fonts, "Honors & Awards", y),
      32
    );

    data.honors.forEach((h: any) => {
      pm.draw((p, y) => drawRow(p, fonts, "Title", h.name, y), 16);
      pm.draw((p, y) => drawRow(p, fonts, "By", h.by, y), 16);
      pm.draw((p, y) => drawRow(p, fonts, "Year", h.year, y), 22);
    });
  }

  /* ================= PUBLICATIONS ================= */

  if (data.publications?.length) {
    pm.draw(
      (p, y) => drawSectionTitle(p, fonts, "Publications", y),
      32
    );

    data.publications.forEach((pub: any) => {
      pm.draw((p, y) => drawRow(p, fonts, "Title", pub.title, y), 16);
      pm.draw((p, y) => drawRow(p, fonts, "Type", pub.type, y), 16);
      pm.draw((p, y) => drawRow(p, fonts, "DOI", pub.doi, y), 22);
    });
  }

  /* ================= CONFERENCES ================= */

  if (data.conferences?.length) {
    pm.draw(
      (p, y) => drawSectionTitle(p, fonts, "Conferences", y),
      32
    );

    data.conferences.forEach((c: any) => {
      pm.draw((p, y) => drawRow(p, fonts, "Name", c.name, y), 16);
      pm.draw((p, y) => drawRow(p, fonts, "City", c.city, y), 16);
      pm.draw((p, y) => drawRow(p, fonts, "Year", c.year, y), 22);
    });
  }

  /* ================= PROFESSIONAL IDS ================= */

  if (data.ids?.orcid) {
    pm.draw(
      (p, y) => drawSectionTitle(p, fonts, "Professional IDs", y),
      32
    );

    pm.draw((p, y) => drawRow(p, fonts, "ORCID", data.ids.orcid, y), 22);
  }
}
