import { AssetLoader } from "./assets/AssetLoader.ts";
import { Graphics } from "./graphics/Graphics.ts";

export interface GameHost {
  readonly assetLoader: AssetLoader;
  readonly graphics: Graphics;

  run(): void;

  tick: (elasped: number) => void;
}
