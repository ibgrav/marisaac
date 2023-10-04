import { css } from "../../utils.tsx";

export const global = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  html {
    font-size: 16px;
    font-weight: 400;
  }

  body {
    margin: 0;
    font-family: "Playfair Display", serif;
    color: rgb(var(--c-vanilla));
    background-color: rgb(var(--c-drab));
    overflow-x: hidden;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    object-position: center;
    background-size: contain;
    background-position: center;
    filter: blur(5px);
    animation-name: blur-in;
    animation-duration: 500ms;
    animation-fill-mode: forwards;
  }

  @media (prefers-reduced-motion) {
    img {
      opacity: 1;
      animation: none;
    }
  }
`;
