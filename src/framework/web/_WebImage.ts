import { PixelCannonError } from "../PixelCannonError.ts";
import { Image } from "../graphics/Image.ts";
import { PixelArray } from "../graphics/PixelArray.ts";

export class WebImage implements Image {
  public get width(): number {
    return this.data.width;
  }

  public get height(): number {
    return this.data.height;
  }

  constructor(public data: ImageBitmap) {}

  public getPixels(): Promise<PixelArray> {
    const canvas = new OffscreenCanvas(this.data.width, this.data.height);
    const context = canvas.getContext("2d");

    if (context === null) {
      throw new PixelCannonError("Failed to create OffscreenCanvas context.");
    }

    context.drawImage(this.data, 0, 0);

    const imageData = context.getImageData(
      0,
      0,
      this.data.width,
      this.data.height
    );

    return Promise.resolve(
      new PixelArray(new Uint8Array(imageData.data.buffer))
    );
  }

  public async setPixels(data: PixelArray): Promise<void> {
    const canvas = new OffscreenCanvas(this.data.width, this.data.height);
    const context = canvas.getContext("2d");

    if (context === null) {
      throw new PixelCannonError("Failed to create OffscreenCanvas context.");
    }

    context.putImageData(
      new ImageData(
        new Uint8ClampedArray(data.data.buffer),
        this.data.width,
        this.data.height
      ),
      0,
      0
    );

    this.data = await createImageBitmap(await canvas.convertToBlob());
  }
}
