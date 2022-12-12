import { Rectangle } from "../Rectangle.ts";
import { Color } from "./Color.ts";
import { Image } from "./Image.ts";

export interface Graphics {
  clear(color: Color): void;
  drawImage(image: Image, dx: number, dy: number): void;
  fillRect(rect: Rectangle, color: Color): void;
}
