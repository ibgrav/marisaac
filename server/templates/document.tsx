import { ComponentChild } from "preact";

interface DocumentProps {
  title?: string;
  children: ComponentChild;
}

const styles = Array.from(Deno.readDirSync("static/styles"))
  .filter((f) => f.isFile)
  .map((f) => "/styles/" + f.name);

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

        {styles.map((file) => (
          <link rel="preload" href={file} as="style" />
        ))}
        {styles.map((file) => (
          <link href={file} rel="stylesheet" />
        ))}
      </head>

      <body>{children}</body>
    </html>
  );
}
