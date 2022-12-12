import { AssetLoader } from "./assets/AssetLoader.ts";
import { Graphics } from "./graphics/Graphics.ts";
import { WebGameHost } from "./web/_WebGameHost.ts";

export class Game {
  private readonly host;

  protected readonly assetLoader: AssetLoader;
  protected readonly graphics: Graphics;

  public constructor() {
    this.host = new WebGameHost();
    this.assetLoader = this.host.assetLoader;
    this.graphics = this.host.graphics;

    this.host.tick = this.tick.bind(this);
  }

  public async run(): Promise<void> {
    await this.initialize();
    this.host.run();
    await this.shutdown();
  }

  private tick(elapsed: number): void {
    this.update(elapsed);
    this.draw(elapsed);
  }

  protected async initialize(): Promise<void> {}

  // deno-lint-ignore no-unused-vars
  protected update(elapsed: number): void {}

  // deno-lint-ignore no-unused-vars
  protected draw(elapsed: number): void {}

  protected async shutdown(): Promise<void> {}
}
