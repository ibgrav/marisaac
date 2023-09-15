import "./styles/index.css";

import { render } from "preact";
import { renderHome } from "./pages/home";
import { renderBlog } from "./pages/blog";

const url = new URL(location.href);

const root = document.getElementById("app")!;

if (url.pathname === "/blog") {
  renderBlog().then((node) => render(node, root));
} else {
  renderHome().then((node) => render(node, root));
}
