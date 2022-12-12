// src/game/SameGameGame.ts
import { Color, Game } from "@framework";
import assets from "@assets";
var SameGameGame = class extends Game {
  x = 0;
  blocksImage = null;
  async initialize() {
    this.blocksImage = await this.assetLoader.loadImage(assets["blocks.png"]);
  }
  update(elapsed) {
    this.x += 1 * elapsed;
  }
  draw(elapsed) {
    this.graphics.clear(new Color(0, 0, 0, 255));
    this.graphics.drawImage(this.blocksImage, this.x, 0);
  }
};

// src/game/main.ts
var game = new SameGameGame();
await game.run();
