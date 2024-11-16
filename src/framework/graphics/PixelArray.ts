import { Pixel } from "./Pixel.ts";

export class PixelArray {
  public constructor(public data: Uint8Array) {}

  public forEach(callback: (pixel: Pixel) => void): void {
    const pixel: Pixel = { r: 0, g: 0, b: 0, a: 0 };
    for (let i = 0; i < this.data.length; i += 4) {
      pixel.r = this.data[i];
      pixel.g = this.data[i + 1];
      pixel.b = this.data[i + 2];
      pixel.a = this.data[i + 3];

      callback(pixel);

      this.data[i] = pixel.r;
      this.data[i + 1] = pixel.g;
      this.data[i + 2] = pixel.b;
      this.data[i + 3] = pixel.a;
    }
  }
}
