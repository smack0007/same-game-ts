import { serveFile } from "jsr:@std/http/file-server";

Deno.serve({ hostname: "localhost", port: 8080 }, async (req) => {
  const url = new URL(req.url);
  let path = decodeURIComponent(url.pathname);

  if (path === "/") {
    path = "/index.html";
  }

  try {
    const file = serveFile(req, `./bin/${path}`);
    console.info(`200 ${path}`);
    return file;
  } catch {
    console.info(`404 ${path}`);
    return new Response("404 Not Found", { status: 404 });
  }
});
