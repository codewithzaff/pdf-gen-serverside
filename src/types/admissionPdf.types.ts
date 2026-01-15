export interface AdmissionPdfData {
  meta: {
    studentId?: string;
    applicationId?: string;
    submittedAt?: string;
  };

  student: {
    fullName?: string;
    email?: string;
    mobile?: string;
    dob?: string;
    gender?: string;
    citizenship?: string;
  };

  address: {
    permanent?: string;
    current?: string;
  };

  education: Array<{
    level?: string;
    institute?: string;
    board?: string;
    year?: string;
    marks?: string;
  }>;

  workExperience: Array<{
    employer?: string;
    role?: string;
    period?: string;
  }>;

  courses: Array<{
    name?: string;
    fee?: number;
  }>;

  honors: Array<{
    name?: string;
    by?: string;
    year?: string;
  }>;

  publications: Array<{
    title?: string;
    type?: string;
    doi?: string;
    date?: string;
  }>;

  conferences: Array<{
    name?: string;
    city?: string;
    year?: string;
  }>;

  ids: {
    orcid?: string;
  };
}
