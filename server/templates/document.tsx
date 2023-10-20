import { ComponentChild } from "preact";
import { variables } from "./styles/variables.ts";
import { animations } from "./styles/animations.ts";
import { global } from "./styles/global.ts";
import { fonts } from "./styles/fonts.ts";

interface DocumentProps {
  title?: string;
  children: ComponentChild;
}

export function Document({ children, title = "" }: DocumentProps) {
  const titles = ["Marissa & Isaac's Adventure"];

  if (title) titles.unshift(title);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Marissa & Isaac's Adventure" />

        <title>{titles.join(" - ")}</title>

        <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />

        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        {fonts}
        {variables}
        {animations}
        {global}
      </head>

      <body>
        <main>
          <a id="title" href="/">
            <h1>Marissa & Isaac's Adventures</h1>
          </a>

          {children}

          <a id="top" href="#title" aria-label="back to top">
            <svg viewBox="0 0 330 330">
              <path d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z" />
            </svg>
          </a>
        </main>
      </body>
    </html>
  );
}
