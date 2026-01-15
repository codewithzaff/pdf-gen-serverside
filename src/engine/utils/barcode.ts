import { writeBarcode } from "@sec-ant/zxing-wasm";

/**
 * Generate barcode PNG buffer using ZXing (Node.js safe)
 */
export async function generateBarcodePng(
  text: string
): Promise<Uint8Array | null> {
  try {
    if (!text) return null;

    const result = await writeBarcode(text, {
      format: "Code128",
    });

    if (result.error) {
      console.error("ZXing error:", result.error);
      return null;
    }

    // Blob → ArrayBuffer → Uint8Array (Node compatible)
    const arrayBuffer = await result.image.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (err) {
    console.error("Barcode generation failed:", err);
    return null;
  }
}
