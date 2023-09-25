import { Page } from "../page.ts";

export const home = new Page();

const image = "D3043740-00FB-4497-A88E-C6C77792D380_w1536_h2048_";

const images = Array.from(Deno.readDirSync("static/assets/images"));

home.render = () => {
  return home.html`
    <h1>Home Change 1</h1>

    <p>
      <a href="/about">About</a>
    </p>
    <p>
      <a href="/contact">Contact</a>
    </p>

    ${images.map((image) => {
      if (!image.name.endsWith("blur_.webp") && !image.name.endsWith("thumb_.webp")) {
        return home.html`<img
          class="fade-in"
          loading="lazy"
          src="/assets/images/${image.name}"
          style="width: 100vw; background-size: cover; background-image: url(/assets/images/${image.name.replace(
            ".webp",
            "blur_.webp"
          )});"
        />`;
      }

      return "";
    })}
      
    
  `;
};
