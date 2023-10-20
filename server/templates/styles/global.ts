import { css } from "../../utils.tsx";

export const global = css`
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  figure {
    margin: 0;
    line-height: 1;
    font-size: inherit;
    font-weight: inherit;
  }

  h1,
  h2 {
    text-shadow: 2px 1px 2px rgba(0, 0, 0, 0.8);
  }

  a {
    display: block;
    text-decoration: none;
    color: inherit;
    position: relative;
    transition: transform 250ms;
  }

  a:active,
  a:target {
    transform: scale(1.05);
  }

  button {
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
  }

  html {
    font-size: 16px;
    font-weight: 400;
    scroll-behavior: smooth;
    font-smooth: auto;
    -webkit-font-smoothing: subpixel-antialiased;
  }

  @media (min-width: 740px) {
    html {
      font-size: 18px;
    }
  }

  body {
    font-family: "Playfair Display", serif;
    color: rgb(var(--c-vanilla));
    background-color: rgb(var(--c-drab));
    overflow-x: hidden;
    margin: 0.5em;
    padding: 0em 0.5em 0.5em 0.5em;
    border-radius: 0.5em;
    min-height: calc(100vh - 1em);
    border: 2px solid rgb(var(--c-vanilla));
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    object-position: center;
    background-size: contain;
    background-position: center;
    border-radius: 0.5em;
    box-shadow: 0px 5px 10px -8px black;
  }

  img.caption {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  figcaption {
    background: rgba(var(--c-vanilla), 0.1);
    padding: 1em 0.5em 0.5em 0.5em;
    margin-top: -0.5em;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    line-height: 1.1;
    letter-spacing: 0.4px;
    font-size: 16px;
  }

  @media (min-width: 740px) {
    figcaption {
      padding: 1.25em 1em 1em 1em;
    }
  }

  main {
    margin: 0 auto;
    max-width: 700px;
  }

  #title {
    padding: 0.5em 0;
    margin: 0.5em 0.5em 0.75em 0.5em;
    font-size: 2em;
    text-align: center;
    outline-color: transparent;
  }

  #top {
    position: fixed;
    right: 1.5em;
    bottom: 1.5em;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    outline: 2px solid rgb(var(--c-vanilla));
  }

  #top svg {
    fill: rgb(var(--c-vanilla));
  }
`;
