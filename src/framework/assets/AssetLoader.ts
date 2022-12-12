import { Asset } from "../assets/Assets.ts";
import { Image } from "../graphics/Image.ts";

export interface AssetLoader {
  loadImage(asset: Asset): Promise<Image>;
}
