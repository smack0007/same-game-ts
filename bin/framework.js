// src/framework/graphics/Color.ts
var Color = class _Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  static areEqual(color1, color2) {
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a;
  }
  equals(other) {
    return this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a;
  }
  with(values) {
    return new _Color(
      values.r ?? this.r,
      values.g ?? this.g,
      values.b ?? this.b,
      values.a ?? this.a
    );
  }
};

// src/framework/PixelCannonError.ts
var PixelCannonError = class extends Error {
  constructor(message) {
    super(message);
  }
};

// src/framework/web/_CanvasGraphics.ts
function colorToCss(color) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}
var CanvasGraphics = class {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.context.fillStyle = colorToCss(this.fillColor);
  }
  fillColor = new Color(0, 0, 0, 255);
  setFillColor(color) {
    if (!color.equals(this.fillColor)) {
      this.context.fillStyle = colorToCss(color);
      this.fillColor = color;
    }
  }
  clear(color) {
    this.setFillColor(color);
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  fillRect(rect, color) {
    this.setFillColor(color);
    this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
  }
  drawImage(image, dx, dy) {
    this.context.drawImage(image.data, dx, dy);
  }
};

// src/framework/web/_WebAssetLoader.ts
var WebAssetLoader = class {
  constructor(graphics) {
    this.graphics = graphics;
  }
  loadImage(asset) {
    return new Promise((resolve) => {
      const data = new globalThis.Image();
      data.onload = () => {
        resolve({
          data,
          width: data.width,
          height: data.height
        });
      };
      data.src = "data:image/png;base64, " + asset;
    });
  }
};

// src/framework/web/_WebGameHost.ts
var FRAME_DELTA = 1e3 / 60;
var WebGameHost = class {
  boundNextFrame;
  lastFrameTimestamp = 0;
  graphics;
  assetLoader;
  tick = null;
  constructor() {
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
  run() {
    requestAnimationFrame(this.boundNextFrame);
  }
  nextFrame(timestamp) {
    if (timestamp - this.lastFrameTimestamp > FRAME_DELTA) {
      this.tick(timestamp - this.lastFrameTimestamp);
      this.lastFrameTimestamp = timestamp;
    }
    requestAnimationFrame(this.boundNextFrame);
  }
};

// src/framework/Game.ts
var Game = class {
  host;
  assetLoader;
  graphics;
  constructor() {
    this.host = new WebGameHost();
    this.assetLoader = this.host.assetLoader;
    this.graphics = this.host.graphics;
    this.host.tick = this.tick.bind(this);
  }
  async run() {
    await this.initialize();
    this.host.run();
    await this.shutdown();
  }
  tick(elapsed) {
    this.update(elapsed);
    this.draw(elapsed);
  }
  async initialize() {
  }
  // deno-lint-ignore no-unused-vars
  update(elapsed) {
  }
  // deno-lint-ignore no-unused-vars
  draw(elapsed) {
  }
  async shutdown() {
  }
};
export {
  Color,
  Game,
  PixelCannonError
};
