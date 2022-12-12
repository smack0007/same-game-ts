import { Image } from "../graphics/Image.ts";

export interface WebImage extends Image {
  data: HTMLImageElement;
}
