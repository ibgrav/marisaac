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

  a {
    display: block;
    text-decoration: none;
    color: inherit;
    position: relative;
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
  }
`;
