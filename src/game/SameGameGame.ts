import { Color, Game } from "@framework";
import assets from "@assets";
import { Image } from "../framework/graphics/Image.ts";

export class SameGameGame extends Game {
  private x = 0;

  private blocksImage: Image = null!;

  protected override async initialize(): Promise<void> {
    this.blocksImage = await this.assetLoader.loadImage(assets["blocks.png"]);
  }

  protected override update(elapsed: number): void {
    this.x += 1 * elapsed;
  }

  protected override draw(elapsed: number): void {
    this.graphics.clear(new Color(0, 0, 0, 255));
    this.graphics.drawImage(this.blocksImage, this.x, 0);
  }
}
