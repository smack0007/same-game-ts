import { Color, Game, Image, Pixel, Vector2 } from "@framework";
import assets from "@assets";

export class SameGameGame extends Game {
  private x = 0;

  private redBlockImage: Image = null!;
  private greenBlockImage: Image = null!;
  private blueBlockImage: Image = null!;
  private yellowBlockImage: Image = null!;

  private async createBloackImage(
    callback: (pixel: Pixel) => void
  ): Promise<Image> {
    const image = await this.assetLoader.loadImage(assets["block.png"]);

    const pixels = await image.getPixels();
    pixels.forEach(callback);
    await image.setPixels(pixels);

    return image;
  }

  protected override async initialize(): Promise<void> {
    this.redBlockImage = await this.createBloackImage((pixel) => {
      pixel.g = 0;
      pixel.b = 0;
    });

    this.greenBlockImage = await this.createBloackImage((pixel) => {
      pixel.r = 0;
      pixel.b = 0;
    });

    this.blueBlockImage = await this.createBloackImage((pixel) => {
      pixel.r = 0;
      pixel.g = 0;
    });

    this.yellowBlockImage = await this.createBloackImage((pixel) => {
      pixel.b = 0;
    });
  }

  protected override update(elapsed: number): void {
    this.x += 1 * elapsed;
  }

  protected override draw(elapsed: number): void {
    this.graphics.clear(new Color(0, 0, 0, 255));
    this.graphics.drawImage(this.redBlockImage, new Vector2(0, 0));
    this.graphics.drawImage(this.greenBlockImage, new Vector2(32, 0));
    this.graphics.drawImage(this.blueBlockImage, new Vector2(64, 0));
    this.graphics.drawImage(this.yellowBlockImage, new Vector2(96, 0));
  }
}
