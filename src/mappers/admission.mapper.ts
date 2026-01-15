export function mapAdmissionToPdfData(admission: any) {
  return {
    fullName: [
      admission.personalDetails?.studentName?.firstName,
      admission.personalDetails?.studentName?.middleName,
      admission.personalDetails?.studentName?.lastName,
    ]
      .filter(Boolean)
      .join(" "),

    email: admission.personalDetails?.email,
    mobile: admission.personalDetails?.mobile,

    education: admission.education || [],

    workExperience: admission.workExperience || [],

    courses:
      admission.courseSelection?.courses?.map((c: any) => ({
        name: c.programName,
        fee: c.price,
      })) || [],
  };
}
