import fetch from "node-fetch";

const BASE_URL = "http://localhost:4001";

export async function getApplicationByAdmissionId(admissionId: string) {
  const res = await fetch(
    `${BASE_URL}/applications?admissionId=${admissionId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch application");
  }

  const data = await res.json();

  // json-server returns an array
  return Array.isArray(data) ? data[0] : null;
}
