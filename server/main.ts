import { serveDir, serveFile } from "std/http/file_server.ts";
import { home } from "./templates/home.ts";

Deno.serve((req: Request) => {
  const pathname = new URL(req.url).pathname;

  if (pathname === "/robots.txt") return serveFile(req, "static/robots.txt");
  if (pathname === "/favicon.ico") return serveFile(req, "static/favicon.ico");
  if (pathname.startsWith("/static")) return serveDir(req, { fsRoot: "static", urlRoot: "static" });

  if (pathname === "/") {
    return new Response(home.document(), {
      status: 200,
      headers: { "content-type": "text/html" }
    });
  }

  return new Response("404: Not Found", {
    status: 404
  });
});
