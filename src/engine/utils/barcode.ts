import bwipjs from "bwip-js";

export async function generateBarcodePng(
  value: string
): Promise<Uint8Array | null> {
  if (!value) return null;

  try {
    const png = await bwipjs.toBuffer({
      bcid: "code128", // Barcode type
      text: value,
      scale: 3,
      height: 10,
      includetext: false,
    });

    return new Uint8Array(png);
  } catch (err) {
    console.warn("⚠️ Barcode generation failed", err);
    return null;
  }
}
