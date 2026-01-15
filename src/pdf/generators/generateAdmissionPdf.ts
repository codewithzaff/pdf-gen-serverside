import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import { formatDate, formatCurrency } from "../utils/formatters";

/* ================= SAFE SETTER ================= */

function safeText(form: any, field: string, value?: any) {
  try {
    form.getTextField(field).setText(value ? String(value) : "");
  } catch {

  }
}

/* ================= GENERATOR ================= */

export async function generateAdmissionPdfServer(
  application: any
): Promise<Buffer> {
  const templatePath = path.join(
    __dirname,
    "../templates/admission_application_v2.pdf"
  );

  const pdfBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  /* ================= META ================= */

  safeText(form, "meta.studentId", application.studentId);
  safeText(form, "meta.applicationId", application.admissionId);
  safeText(form, "meta.submittedAt", formatDate(application.submittedAt));

  /* ================= PERSONAL ================= */

  const pd = application.personalDetails || {};
  const name = pd.studentName || {};

  safeText(
    form,
    "student.fullName",
    [name.firstName, name.middleName, name.lastName].filter(Boolean).join(" ")
  );
  safeText(form, "student.email", pd.email);
  safeText(form, "student.mobile", pd.mobile);
  safeText(form, "student.dob", formatDate(pd.dob));
  safeText(form, "student.gender", pd.gender);
  safeText(form, "student.citizenship", pd.citizenship);

  /* ================= ADDRESS ================= */

  safeText(
    form,
    "address.permanent",
    [
      pd.permanentAddress?.HouseBuildingNum,
      pd.permanentAddress?.street,
      pd.permanentAddress?.city,
      pd.permanentAddress?.state,
      pd.permanentAddress?.pincode,
      pd.permanentAddress?.country,
    ]
      .filter(Boolean)
      .join(", ")
  );

  safeText(
    form,
    "address.current",
    [
      pd.currentAddress?.HouseBuildingNum,
      pd.currentAddress?.street,
      pd.currentAddress?.city,
      pd.currentAddress?.state,
      pd.currentAddress?.pincode,
      pd.currentAddress?.country,
    ]
      .filter(Boolean)
      .join(", ")
  );

  /* ================= COURSES ================= */

  application.courseSelection?.courses
    ?.slice(0, 2)
    .forEach((c: any, i: number) => {
      safeText(form, `course.${i + 1}.name`, c.programName);
      safeText(form, `course.${i + 1}.fee`, formatCurrency(c.price));
    });

  /* ================= EDUCATION ================= */

  const edu = application.education || {};

  // High School
  safeText(form, "education.1.level", "High School");
  safeText(form, "education.1.institute", edu.highSchool?.schoolName);
  safeText(form, "education.1.board", edu.highSchool?.schoolBoardName);
  safeText(form, "education.1.year", edu.highSchool?.graduationYear);
  safeText(form, "education.1.marks", edu.highSchool?.marks);

  // Higher Secondary
  safeText(form, "education.2.level", "Higher Secondary");
  safeText(form, "education.2.institute", edu.higherSecondary?.schoolName);
  safeText(form, "education.2.board", edu.higherSecondary?.schoolBoardName);
  safeText(form, "education.2.year", edu.higherSecondary?.graduationYear);
  safeText(form, "education.2.marks", edu.higherSecondary?.marks);

  // College / University
  const college = edu.collegeUniversity?.[0];
  if (college) {
    safeText(form, "education.3.level", "College / University");
    safeText(form, "education.3.institute", college.collegeName);
    safeText(form, "education.3.board", college.affiliatedUniversity);
    safeText(form, "education.3.year", college.graduationYear);
    safeText(form, "education.3.marks", college.marks);
  }

  /* ================= WORK EXPERIENCE ================= */

  const work = application.workExperience || {};

  if (work.currentEmployment) {
    safeText(form, "work.1.employer", work.currentEmployment.employerName);
    safeText(form, "work.1.role", work.currentEmployment.jobTitle);
    safeText(
      form,
      "work.1.period",
      `${formatDate(work.currentEmployment.employmentStartDate)} – Present`
    );
  }

  if (work.pastEmployment?.[0]) {
    const p = work.pastEmployment[0];
    safeText(form, "work.2.employer", p.employerName);
    safeText(form, "work.2.role", p.jobTitle);
    safeText(
      form,
      "work.2.period",
      `${formatDate(p.employmentStartDate)} – ${formatDate(
        p.employmentEndDate
      )}`
    );
  }

  /* ================= HONORS ================= */

  const honor = application.honorsAwards?.honors?.[0];
  if (honor) {
    safeText(form, "honor.1.name", honor.awardName);
    safeText(form, "honor.1.by", honor.awardedBy);
    safeText(form, "honor.1.year", honor.awardYear);
  }

  /* ================= PUBLICATION ================= */

  const pub = application.honorsAwards?.publications?.[0];
  if (pub) {
    safeText(form, "publication.1.title", pub.publicationTitle);
    safeText(form, "publication.1.type", pub.publicationType);
    safeText(form, "publication.1.doi", pub.DOI);
    safeText(form, "publication.1.date", formatDate(pub.publicationDate));
  }

  /* ================= CONFERENCE ================= */

  const conf = application.honorsAwards?.conferences?.[0];
  if (conf) {
    safeText(form, "conference.1.name", conf.conferenceName);
    safeText(form, "conference.1.city", conf.cityHosted);
    safeText(form, "conference.1.year", conf.yearHosted);
  }

  /* ================= IDS ================= */

  safeText(form, "ids.orcid", application.honorsAwards?.orchidID);

  /* ================= FINAL ================= */

  form.flatten();
  return Buffer.from(await pdfDoc.save());
}
