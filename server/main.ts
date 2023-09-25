import { serveDir } from "std/http/file_server.ts";
import { home } from "./templates/home.ts";

const staticFiles = Array.from(Deno.readDirSync("static"));

Deno.serve((req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === "/") return home.document();

  if (staticFiles.some((f) => url.pathname.slice(1).startsWith(f.name))) {
    return serveDir(req, { fsRoot: "static", headers: ["cache-control:max-age=31536000"] });
  }

  return new Response(null, { status: 404 });
});
