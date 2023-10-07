import "std/dotenv/load.ts";
import { serveDir } from "std/http/file_server.ts";
import render from "preact-render-to-string";
import { home } from "./pages/home.tsx";
import { htmlResponse } from "./utils.tsx";
import { error404 } from "./pages/404.tsx";
import { location } from "./pages/location.tsx";

const staticFiles = Array.from(Deno.readDirSync("static"));

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  const preview = url.hostname !== "marisaac.site";

  if (url.pathname === "/") {
    return htmlResponse(render(await home(preview)));
  }

  if (url.pathname.startsWith("/location/")) {
    const slug = url.pathname.slice("/location/".length);
    return htmlResponse(render(await location(preview, slug)));
  }

  if (url.pathname === "/debug") {
    return new Response(JSON.stringify({ url, preview }), { status: 200 });
  }

  if (url.pathname === "/robots.txt") {
    const allow = url.hostname === "marisaac.site";
    return new Response(["User-agent: *", `${allow ? "Allow" : "Disallow"}: /`].join("\n"), { status: 200 });
  }

  if (staticFiles.some((f) => url.pathname.slice(1).startsWith(f.name))) {
    return serveDir(req, { fsRoot: "static", headers: ["cache-control:must-revalidate"] });
  }

  return htmlResponse(render(error404()), 404);
});
