import { PixelArray } from "./PixelArray.ts";

export interface Image {
  readonly width: number;
  readonly height: number;

  getPixels(): Promise<PixelArray>;
  setPixels(data: PixelArray): Promise<void>;
}
