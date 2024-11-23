import { encode } from "./ext/base64-arraybuffer.ts";

const ESBUILD_COMMAND = "deno";
const ESBUILD_ARGS = [
  "task",
  "esbuild",
  "--bundle",
  "--target=es2022",
  "--format=esm",
];

interface BundleOptions {
  external?: string[];
}

async function bundle(
  inputFile: string,
  outputFile: string,
  options: BundleOptions = {}
): Promise<number> {
  const args = [...ESBUILD_ARGS];

  if (options.external) {
    args.push(...options.external.map((x) => `--external:${x}`));
  }

  args.push(`--outfile=${outputFile}`);
  args.push(inputFile);

  const command = new Deno.Command(ESBUILD_COMMAND, { args });

  const { code, stdout, stderr } = await command.output();

  console.info(new TextDecoder().decode(stdout));
  console.error(new TextDecoder().decode(stderr));

  return code;
}

async function bundleFramework(): Promise<number> {
  return await bundle("./src/framework/mod.ts", "./bin/framework.js");
}

async function bundleGame(): Promise<number> {
  return await bundle("./src/game/main.ts", "./bin/game.js", {
    external: ["@assets", "@framework"],
  });
}

async function bundleAssets(): Promise<void> {
  const encoder = new TextEncoder();

  const file = await Deno.create("./bin/assets.js");
  const writer = file.writable.getWriter();
  writer.write(encoder.encode("export default {\n"));

  for await (const entry of await Deno.readDir("./assets")) {
    if (!entry.isFile) {
      continue;
    }

    const asset = await Deno.readFile("./assets/" + entry.name);
    writer.write(encoder.encode(`\t"${entry.name}": "${encode(asset)}",\n`));
  }

  writer.write(encoder.encode("}\n"));
  await writer.close();
}

async function copyStaticFiles(): Promise<void> {
  await Deno.copyFile("src/index.html", "bin/index.html");
}

async function main(): Promise<number> {
  performance.mark("build");

  try {
    await bundleFramework();
    await bundleGame();
    await bundleAssets();
    await copyStaticFiles();
  } catch (err) {
    console.error(err);
    return 1;
  }

  const duration = performance.measure("build").duration;
  console.info(`Build duration: ${duration} ms`);

  return 0;
}

Deno.exit(await main());
