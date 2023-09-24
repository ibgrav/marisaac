type PageRenderFn = () => string;

export class Page {
  public title = "Marissa & Isaac";
  public description = "Marissa & Isaac";

  public html = html;
  public render: PageRenderFn = () => "Error: Page Not Found";

  constructor() {}

  document(): string {
    return html`<!DOCTYPE html>
      <html>
        <head>
          <title>${this.title}</title>
          <meta name="description" content="${this.description}" />

          <link rel="preload" href="/static/styles/main.css" as="style" />
          <link rel="stylesheet" href="/static/styles/main.css" />
        </head>
        <body>
          ${this.render()}
        </body>
      </html>`;
  }
}

function argToString(arg: unknown): string {
  if (typeof arg === "number") return arg.toString();
  if (typeof arg === "string") return arg;

  if (Array.isArray(arg)) {
    return arg.reduce((p, n) => p + argToString(n), "");
  }

  return "";
}

export function html(strings: TemplateStringsArray, ...args: unknown[]): string {
  return strings.reduce((p, n, i) => {
    return p + n + argToString(args[i]);
  }, "");
}
