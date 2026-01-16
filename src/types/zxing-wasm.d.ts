declare module "zxing-wasm" {
  export function writeBarcode(
    text: string,
    options?: {
      format?: string;
      width?: number;
      height?: number;
    }
  ): Promise<Uint8Array>;

  export function readBarcodes(
    image: Uint8Array,
    options?: {
      formats?: string[];
    }
  ): Promise<any>;
}
