/**
 * Load image bytes from URL or base64
 * Node 18+ compatible
 */
export async function loadImageBytes(
  src?: string
): Promise<Uint8Array | null> {
  try {
    if (!src) return null;

    // Base64 image
    if (src.startsWith("data:image")) {
      const base64 = src.split(",")[1];
      return Uint8Array.from(Buffer.from(base64, "base64"));
    }

    // URL image
    const res = await fetch(src);
    if (!res.ok) return null;

    const buffer = await res.arrayBuffer();
    return new Uint8Array(buffer);
  } catch {
    return null;
  }
}
