export const admissionPdfFields = {
  /* ================= META ================= */
  meta: {
    studentId: "meta.studentId",
    applicationId: "meta.applicationId",
    submittedAt: "meta.submittedAt",
  },

  /* ================= STUDENT ================= */

  student: {
    fullName: "student.fullName",
    email: "student.email",
    mobile: "student.mobile",
    dob: "student.dob",
    gender: "student.gender",
    citizenship: "student.citizenship",
  },

  /* ================= ADDRESS ================= */

  address: {
    permanent: "address.permanent",
    current: "address.current",
  },

  /* ================= COURSES (MAX 4) ================= */

  courses: {
    name: (index: number) => `course.${index}.name`,
    fee: (index: number) => `course.${index}.fee`,
    totalFee: "course.totalFee",
  },

  /* ================= EDUCATION (MAX 3) ================= */

  education: {
    level: (index: number) => `education.${index}.level`,
    institute: (index: number) => `education.${index}.institute`,
    board: (index: number) => `education.${index}.board`,
    year: (index: number) => `education.${index}.year`,
    marks: (index: number) => `education.${index}.marks`,
  },

  /* ================= WORK EXPERIENCE (MAX 2) ================= */

  work: {
    employer: (index: number) => `work.${index}.employer`,
    role: (index: number) => `work.${index}.role`,
    period: (index: number) => `work.${index}.period`,
  },

  /* ================= HONORS & AWARDS (MAX 1 / 2) ================= */

  honor: {
    name: (index: number) => `honor.${index}.name`,
    by: (index: number) => `honor.${index}.by`,
    year: (index: number) => `honor.${index}.year`,
  },

  /* ================= PUBLICATIONS (MAX 1 / 2) ================= */

  publication: {
    title: (index: number) => `publication.${index}.title`,
    type: (index: number) => `publication.${index}.type`,
    doi: (index: number) => `publication.${index}.doi`,
    date: (index: number) => `publication.${index}.date`,
  },

  /* ================= CONFERENCES (MAX 1 / 2) ================= */

  conference: {
    name: (index: number) => `conference.${index}.name`,
    city: (index: number) => `conference.${index}.city`,
    year: (index: number) => `conference.${index}.year`,
  },

  /* ================= PROFESSIONAL IDS ================= */

  ids: {
    orcid: "ids.orcid",
  },
} as const;
