import { GameHost } from "../_GameHost.ts";
import { PixelCannonError } from "../PixelCannonError.ts";
import { CanvasGraphics } from "./_CanvasGraphics.ts";
import { WebAssetLoader } from "./_WebAssetLoader.ts";

const FRAME_DELTA = 1000.0 / 60.0;

export class WebGameHost implements GameHost {
  private boundNextFrame: (timestamp: number) => void;
  private lastFrameTimestamp = 0;

  public readonly graphics: CanvasGraphics;

  public readonly assetLoader: WebAssetLoader;

  public tick: (elasped: number) => void = null!;

  public constructor() {
    const canvas = document.getElementById("game");

    if (canvas === null || !(canvas instanceof HTMLCanvasElement)) {
      throw new PixelCannonError("Failed to get canvas element.");
    }

    const context = canvas.getContext("2d");

    if (context === null) {
      throw new PixelCannonError("Failed to get 2D rendering context.");
    }

    this.graphics = new CanvasGraphics(canvas, context);

    this.assetLoader = new WebAssetLoader(this.graphics);

    this.boundNextFrame = this.nextFrame.bind(this);
  }

  public run(): void {
    requestAnimationFrame(this.boundNextFrame);
  }

  private nextFrame(timestamp: number): void {
    if (timestamp - this.lastFrameTimestamp > FRAME_DELTA) {
      this.tick(timestamp - this.lastFrameTimestamp);
      this.lastFrameTimestamp = timestamp;
    }
    requestAnimationFrame(this.boundNextFrame);
  }
}
