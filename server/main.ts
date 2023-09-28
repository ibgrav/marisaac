import { load } from "std/dotenv/mod.ts";
import { serveDir } from "std/http/file_server.ts";
import render from "preact-render-to-string";
import { home } from "./pages/home.tsx";

await load({ allowEmptyValues: true });

const IS_DEV = Deno.env.get("DENO_DEV") === "true";
const staticFiles = Array.from(Deno.readDirSync("static"));

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === "/") {
    const body = render(await home());

    return new Response(body, {
      status: 200,
      headers: { "content-type": "text/html" }
    });
  }

  if (staticFiles.some((f) => url.pathname.slice(1).startsWith(f.name))) {
    return serveDir(req, {
      fsRoot: "static",
      headers: IS_DEV ? undefined : ["cache-control:max-age=31536000"]
    });
  }

  return new Response(null, { status: 404 });
});
