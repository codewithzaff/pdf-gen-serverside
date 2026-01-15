import fetch from "node-fetch";
import { ADMISSION_API_BASE } from "../config/env";

export async function getAdmissionById(admissionId: string) {
  const res = await fetch(
    `${ADMISSION_API_BASE}/applications?admissionId=${admissionId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch admission data");
  }

  const data = await res.json();

  if (!Array.isArray(data) || !data.length) {
    throw new Error("Admission not found");
  }

  return data[0];
}
