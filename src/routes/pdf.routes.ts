import { Router } from "express";
import fetch from "node-fetch";
import { createAdmissionPdf } from "../engine";
import { mapAdmissionToPdfData } from "../mappers/admissionPdf.mapper";

const router = Router(); // ✅ THIS WAS MISSING

router.get("/admission/:admissionId/pdf", async (req, res) => {
  try {
    const { admissionId } = req.params;

    console.log("📄 Generating PDF for:", admissionId);

    const url = `http://localhost:4001/applications?admissionId=${admissionId}`;
    console.log("🌐 Fetching from:", url);

    const response = await fetch(url);
    const data = await response.json();

    const application = data?.[0];

    if (!application) {
      throw new Error("Application not found");
    }

    console.log("✅ Application fetched");
   console.log("📦 APPLICATION PAYLOAD (student section):");
console.dir(application.student, { depth: null });
console.log("📦 APPLICATION PAYLOAD (personalDetails):");
console.dir(application.personalDetails, { depth: null });
console.log("📦 APPLICATION PAYLOAD (documents):");
console.dir(application.documents, { depth: null });


    // 🔴 RAW API PAYLOAD
    console.log("========== RAW APPLICATION ==========");
    console.log(JSON.stringify(application, null, 2));
    console.log("====================================");

    const pdfData = mapAdmissionToPdfData(application);

    // 🔴 FINAL DATA GOING TO PDF ENGINE
    console.log("========== MAPPED PDF DATA ==========");
    console.log(JSON.stringify(pdfData, null, 2));
    console.log("====================================");

    const pdfBytes = await createAdmissionPdf(pdfData);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=Admission_${admissionId}.pdf`
    );

    res.send(pdfBytes);
  } catch (err: any) {
    console.error("❌ REAL PDF ERROR");
    console.error(err);
    console.error(err?.stack);

    res.status(500).json({
      message: "PDF generation failed",
      error: err?.message || err,
    });
  }
});

export default router;
