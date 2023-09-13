import { APPLE_MAP_TOKEN } from "$env/static/private";
import type { RequestHandler } from "./$types";
// import * as jwt from "jsonwebtoken";

export const GET: RequestHandler = (ctx) => {
  //   const payload = {
  //     iss: APPLE_TEAM_ID,
  //     iat: Date.now(),
  //     exp: Date.now() + 1000 * 60 * 60 * 24 /* one day */
  //   };

  //   const header = {
  //     alg: "ES256",
  //     typ: "JWT",
  //     kid: APPLE_KEY_ID
  //   };

  //   console.log(APPLE_MAP_TOKEN.replace(/\\n/g, "\n"));

  //   const token = jwt.sign(payload, APPLE_MAP_TOKEN, { header });

  return new Response(APPLE_MAP_TOKEN);
};
