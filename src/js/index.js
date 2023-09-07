import { home } from "./home.js";
import { post } from "./post.js";

const url = new URL(location.href);

if (url.pathname === "/") {
  home();
}

if (url.pathname.startsWith("/post/")) {
  post(url.pathname.substring(6));
}
