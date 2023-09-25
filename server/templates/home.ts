import { Page } from "../page.ts";

export const home = new Page();

home.render = () => {
  return home.html`
    <h1>Home Change 1</h1>
    <p>
      <a href="/about">About</a>
    </p>
    <p>
      <a href="/contact">Contact</a>
    </p>
  `;
};
