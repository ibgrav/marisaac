import { css } from "../../utils.tsx";

export const header = css`
  body.scroll {
    margin-top: calc(88px + 3em);
  }

  #header {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2em 2em 1em 2em;
    padding: 12px;
    background: rgb(var(--c-drab), 0.8);
    border: 2px solid rgb(var(--c-vanilla));
    border-radius: 6px;
    z-index: 99;
    text-align: center;
  }

  #header h1 {
    font-size: 1.5em;
  }

  body.scroll #header {
    width: 300px;
    height: 20px;
    margin: 0;
    top: 8px;
    left: calc(50% - 164px);
    position: fixed;

    animation: fly-down 0.5s forwards;
  }

  body.scroll #header h1 {
    font-size: 1.2em;
  }

  #header nav {
    display: flex;
    justify-content: space-evenly;
  }

  @media (min-width: 800px) {
    body.scroll {
      margin-top: 136px;
    }

    /* #header {
      font-size: 2em;
    } */
  }
`;
