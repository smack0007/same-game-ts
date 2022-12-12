import { AssetLoader } from "../assets/AssetLoader.ts";
import { Asset } from "../assets/Assets.ts";
import { CanvasGraphics } from "./_CanvasGraphics.ts";
import { WebImage } from "./_WebImage.ts";

export class WebAssetLoader implements AssetLoader {
  constructor(private readonly graphics: CanvasGraphics) {}

  public loadImage(asset: Asset): Promise<WebImage> {
    return new Promise((resolve) => {
      const data = new globalThis.Image();
      data.onload = () => {
        resolve({
          data: data,
          width: data.width,
          height: data.height,
        });
      };
      data.src = "data:image/png;base64, " + asset;
    });
  }
}
