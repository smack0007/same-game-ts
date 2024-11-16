import { Color } from "../graphics/Color.ts";
import { Graphics } from "../graphics/Graphics.ts";
import { Rectangle } from "../Rectangle.ts";
import { Vector2 } from "../Vector2.ts";
import { WebImage } from "./_WebImage.ts";

function colorToCss(color: Color): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}

export class CanvasGraphics implements Graphics {
  private fillColor: Color = new Color(0, 0, 0, 255);

  constructor(
    private canvas: HTMLCanvasElement,
    private context: CanvasRenderingContext2D
  ) {
    this.context.fillStyle = colorToCss(this.fillColor);
  }

  private setFillColor(color: Color): void {
    if (!color.equals(this.fillColor)) {
      this.context.fillStyle = colorToCss(color);
      this.fillColor = color;
    }
  }

  public clear(color: Color): void {
    this.setFillColor(color);
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public fillRect(rect: Rectangle, color: Color): void {
    this.setFillColor(color);
    this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  public drawImage(
    image: WebImage,
    dest: Rectangle | Vector2,
    src?: Rectangle
  ): void {
    if (src !== undefined) {
      if (dest instanceof Rectangle) {
        this.context.drawImage(
          image.data,
          src.x,
          src.y,
          src.width,
          src.height,
          dest.x,
          dest.y,
          dest.width,
          dest.height
        );
      } else {
        this.context.drawImage(
          image.data,
          src.x,
          src.y,
          src.width,
          src.height,
          dest.x,
          dest.y,
          src.width,
          src.height
        );
      }
    } else {
      if (dest instanceof Rectangle) {
        this.context.drawImage(image.data, dest.x, dest.y, dest.width, dest.height);
      } else {
        this.context.drawImage(image.data, dest.x, dest.y);
      }
    }
  }
}
