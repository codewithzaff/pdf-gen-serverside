import express from "express";
import pdfRoutes from "./routes/pdf.routes";

const app = express();
const PORT = 5001;

app.use(express.json());

// 🔴 THIS LINE IS CRITICAL
app.use("/pdf", pdfRoutes);

app.get("/", (_req, res) => {
  res.send("PDF service running");
});

app.listen(PORT, () => {
  console.log(`PDF service running on http://localhost:${PORT}`);
});
