import { ComponentChild } from "preact";
import { Styles } from "./styles/styles.tsx";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossorigin" />

        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />

        <script src="/scripts/main.js" type="module" />

        <Styles />
      </head>

      <body>
        <div id="header">
          <a href="/">
            <h1>Marissa & Isaac's Adventure</h1>
          </a>
        </div>

        {children}
      </body>
    </html>
  );
}
