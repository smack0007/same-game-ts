import { Rectangle } from "../Rectangle.ts";
import { Vector2 } from "../Vector2.ts";
import { Color } from "./Color.ts";
import { Image } from "./Image.ts";

export interface Graphics {
  clear(color: Color): void;

  drawImage(image: Image, dest: Vector2 | Rectangle): void;
  drawImage(image: Image, dest: Vector2 | Rectangle, src: Rectangle): void;
  drawImage(
    image: Image,
    dest: Rectangle | Vector2,
    src?: Rectangle
  ): void;

  fillRect(rect: Rectangle, color: Color): void;
}
