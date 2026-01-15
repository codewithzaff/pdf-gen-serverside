/* ================= UTILITIES ================= */

function formatDate(date?: string) {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("en-GB");
  } catch {
    return date;
  }
}

function formatAddress(addr: any): string {
  if (!addr) return "";

  return [
    addr.HouseBuildingNum,
    addr.street,
    addr.village_town,
    addr.city,
    addr.state,
    addr.pincode,
    addr.country,
  ]
    .filter(Boolean)
    .join(", ");
}

/* ================= MAIN MAPPER ================= */

export function mapAdmissionToPdfData(application: any) {
  /* ================= META ================= */

  const meta = {
    studentId: application.studentId || "",
    applicationId: application.admissionId || "",
    submittedAt: formatDate(application.submittedAt),
  };

  /* ================= STUDENT ================= */

  const name = application.personalDetails?.studentName || {};

  const student = {
    fullName: [
      name.firstName,
      name.middleName,
      name.lastName,
    ]
      .filter(Boolean)
      .join(" "),
    email: application.personalDetails?.email || "",
    mobile: application.personalDetails?.mobile || "",
    dob: formatDate(application.personalDetails?.dob),
    gender: application.personalDetails?.gender || "",
    citizenship: application.personalDetails?.citizenship || "",
  };

  /* ================= ADDRESS ================= */

  const address = {
    permanent: formatAddress(
      application.personalDetails?.permanentAddress
    ),
    current: formatAddress(
      application.personalDetails?.currentAddress
    ),
  };

  /* ================= EDUCATION ================= */

  const education: any[] = [];
  const edu = application.education || {};

  if (edu.highSchool) {
    education.push({
      level: "High School",
      institute: edu.highSchool.schoolName,
      board: edu.highSchool.schoolBoardName,
      year: edu.highSchool.graduationYear,
      marks: edu.highSchool.marks,
    });
  }

  if (edu.higherSecondary) {
    education.push({
      level: "Higher Secondary",
      institute: edu.higherSecondary.schoolName,
      board: edu.higherSecondary.schoolBoardName,
      year: edu.higherSecondary.graduationYear,
      marks: edu.higherSecondary.marks,
    });
  }

  if (Array.isArray(edu.collegeUniversity)) {
    edu.collegeUniversity.forEach((c: any) => {
      education.push({
        level: "College / University",
        institute: c.collegeName,
        board: c.affiliatedUniversity,
        year: c.graduationYear,
        marks: c.marks,
      });
    });
  }

  /* ================= WORK EXPERIENCE ================= */

  const workExperience: any[] = [];

  if (application.workExperience?.currentEmployment) {
    const ce = application.workExperience.currentEmployment;
    workExperience.push({
      employer: ce.employerName,
      role: ce.jobTitle,
      period: `${formatDate(ce.employmentStartDate)} - Present`,
    });
  }

  if (Array.isArray(application.workExperience?.pastEmployment)) {
    application.workExperience.pastEmployment.forEach((job: any) => {
      workExperience.push({
        employer: job.employerName,
        role: job.jobTitle,
        period: `${formatDate(job.employmentStartDate)} - ${formatDate(
          job.employmentEndDate
        )}`,
      });
    });
  }

  /* ================= COURSES ================= */

  const courses =
    application.courseSelection?.courses?.map((c: any) => ({
      name: c.programName,
      fee: c.price,
    })) || [];

  /* ================= HONORS ================= */

  const honors =
    application.honorsAwards?.honors?.map((h: any) => ({
      name: h.awardName,
      by: h.awardedBy,
      year: h.awardYear,
    })) || [];

  /* ================= PUBLICATIONS ================= */

  const publications =
    application.honorsAwards?.publications?.map((p: any) => ({
      title: p.publicationTitle,
      type: p.publicationType,
      doi: p.DOI || p.doi || "",
      date: formatDate(p.publicationDate),
    })) || [];

  /* ================= CONFERENCES ================= */

  const conferences =
    application.honorsAwards?.conferences?.map((c: any) => ({
      name: c.conferenceName,
      city: c.cityHosted,
      year: c.yearHosted,
    })) || [];

  /* ================= PROFESSIONAL IDS ================= */

  const ids = {
    orcid: application.honorsAwards?.orchidID || "",
  };

  /* ================= FINAL OBJECT ================= */

  return {
    meta,
    student,
    address,
    education,
    workExperience,
    courses,
    honors,
    publications,
    conferences,
    ids,
  };
}
