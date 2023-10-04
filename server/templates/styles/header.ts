import { css } from "../../utils.tsx";

export const header = css`
  body.scroll {
    margin-top: 72px;
  }

  h1 {
    text-align: center;
    margin: 4px;
    padding: 0 4px;
    font-weight: 400;
    background: rgb(var(--c-drab), 0.8);
    border: 2px solid rgb(var(--c-vanilla));
    border-radius: 6px;
    font-size: 1.5em;
    z-index: 99;
    line-height: 60px;
  }

  body.scroll h1 {
    position: fixed;
    width: calc(100% - 20px);
    left: 0;
    top: 0;
    font-size: 1em;
    line-height: 40px;
    animation: fly-down 0.5s forwards;
  }

  @media (min-width: 520px) {
    body.scroll h1 {
      max-width: 500px;
      left: calc(50% - 260px);
    }
  }

  @media (min-width: 800px) {
    body.scroll {
      margin-top: 92px;
    }

    h1 {
      font-size: 2em;
      line-height: 80px;
    }
  }
`;
