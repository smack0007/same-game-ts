import { AssetLoader } from "../assets/AssetLoader.ts";
import { Asset } from "../assets/Assets.ts";
import { decode } from "../../../ext/base64-arraybuffer.ts";
import { CanvasGraphics } from "./_CanvasGraphics.ts";
import { WebImage } from "./_WebImage.ts";

export class WebAssetLoader implements AssetLoader {
  constructor(private readonly graphics: CanvasGraphics) {}

  public async loadImage(asset: Asset): Promise<WebImage> {
    const data = await createImageBitmap(
      new Blob([decode(asset as string)])
    );
    return new WebImage(data);
  }
}
