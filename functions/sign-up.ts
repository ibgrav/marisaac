import * as contentful from "contentful-management";

type Env = {
  CONTENTFUL_ACCESS_TOKEN: string;
  RECAPTCHA_SECRET_KEY: string;
  FOLLOWING_ID: string;
  VITE_SPACE_ID: string;
  VITE_PREVIEW_TOKEN: string;
  VITE_DELIVERY_TOKEN: string;
};

type Body = {
  email: string;
  token: string;
};

type RecaptchaResponse = {
  success: boolean;
};

export const onRequest: PagesFunction<Env, string> = async (ctx) => {
  const { email, token } = (await ctx.request.json()) as Body;

  if (!email || !token) return new Response("Missing required arguments.", { status: 400 });

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      secret: ctx.env.RECAPTCHA_SECRET_KEY,
      response: token
    })
  });

  const data = (await res.json()) as RecaptchaResponse;

  if (!data.success) return new Response("Failed reCAPTCHA.", { status: 400 });

  const client = contentful.createClient({
    accessToken: ctx.env.CONTENTFUL_ACCESS_TOKEN,
    adapter: async (config) => {
      const url = new URL(`${config.baseURL}/${config.url}`);

      if (config.params) {
        for (const key of Object.keys(config.params)) {
          url.searchParams.append(key, config.params[key]);
        }
      }

      const request = new Request(url.href, {
        method: config.method ? config.method.toUpperCase() : "GET",
        headers: config.headers ? config.headers : {},
        body: config.data,
        redirect: "manual"
      });

      const response = await fetch(request);

      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      return {
        data: await response.json(),
        status: response.status,
        statusText: response.statusText,
        headers,
        config: config,
        request: request
      };
    }
  });

  const space = await client.getSpace(ctx.env.VITE_SPACE_ID);
  const env = await space.getEnvironment("master");
  const entry = await env.getEntry(ctx.env.FOLLOWING_ID);

  let emails = ((entry.fields.emails?.["en-US"] as string) || "").split(",");
  emails = emails.filter((e) => e);

  if (!emails.includes(email)) {
    emails.push(email);

    entry.fields.emails = { "en-US": emails.join(", ") };

    await entry.update();
    await entry.publish();
  }

  return new Response("Thanks for signing up!", { status: 200 });
};
