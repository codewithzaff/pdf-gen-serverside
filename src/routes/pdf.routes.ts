import { Router } from "express";
import fetch from "node-fetch";
import { createAdmissionPdf } from "../engine";
import { mapAdmissionToPdfData } from "../mappers/admissionPdf.mapper";

const router = Router();

router.get("/admission/:admissionId/pdf", async (req, res) => {
  try {
    const { admissionId } = req.params;

    console.log("📄 Generating PDF for:", admissionId);

    const url = "http://localhost:4001/applications";
    console.log("🌐 Fetching from:", url);

    const response = await fetch(url);
    const applications = await response.json();

    console.log("📦 Total applications fetched:", applications.length);

    // 🔍 FIND APPLICATION SAFELY
    const application = applications.find((app: any) => {
      return (
        app.admissionId === admissionId ||
        app.meta?.admissionId === admissionId ||
        app.applicationId === admissionId ||
        app.personalDetails?.admissionId === admissionId ||
        app.id === admissionId // ✅ IMPORTANT (json-server default)
      );
    });

    if (!application) {
      console.error("❌ No matching application found for:", admissionId);
      console.log(
        "🔍 Available identifiers:",
        applications.map((a: any) => ({
          id: a.id,
          admissionId: a.admissionId,
          metaAdmissionId: a.meta?.admissionId,
        }))
      );
      throw new Error("Application not found");
    }

    console.log("✅ Application matched");
    console.log("🆔 Matched application ID:", application.id);

    // ================= MAP DATA =================
    const pdfData = mapAdmissionToPdfData(application);

    console.log("✅ PDF data mapped successfully");

    // ================= GENERATE PDF =================
    const pdfBytes = await createAdmissionPdf(pdfData);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=Admission_${admissionId}.pdf`
    );

    res.send(pdfBytes);
  } catch (err: any) {
    console.error("❌ REAL PDF ERROR");
    console.error(err?.message);
    console.error(err?.stack);

    res.status(500).json({
      message: "PDF generation failed",
      error: err?.message || err,
    });
  }
});

export default router;
