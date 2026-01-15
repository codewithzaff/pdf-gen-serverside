import { writeBarcode } from "zxing-wasm";

/**
 * Generates a CODE_128 barcode as PNG bytes
 * @param applicationId string
 */
export async function generateBarcode(
  applicationId: string
): Promise<Uint8Array> {
  if (!applicationId || typeof applicationId !== "string") {
    throw new Error("Invalid Application ID for barcode");
  }

  const pngBytes = await writeBarcode(applicationId, {
    format: "CODE_128",
    width: 420,
    height: 110,
  });

  return pngBytes;
}
