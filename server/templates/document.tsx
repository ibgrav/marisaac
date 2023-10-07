import { ComponentChild } from "preact";
import { variables } from "./styles/variables.ts";
import { animations } from "./styles/animations.ts";
import { global } from "./styles/global.ts";
import { fonts } from "./styles/fonts.ts";

interface DocumentProps {
  title?: string;
  children: ComponentChild;
}

export function Document({ children, title }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Marissa & Isaac's Adventure" />

        <title>{title || "Marissa & Isaac's Adventure"}</title>

        <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />

        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <script src="/scripts/main.js" type="module" />

        {fonts}
        {variables}
        {animations}
        {global}
      </head>

      <body>
        <main>
          <a id="title" href="/">
            <h1>Marissa & Isaac's Adventure</h1>
          </a>

          {children}
        </main>
      </body>
    </html>
  );
}
