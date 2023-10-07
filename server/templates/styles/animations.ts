import { css } from "../../utils.tsx";

export const animations = css`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fly-up {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }

  .fly-up {
    animation: fly-up 500ms forwards;
  }

  @keyframes fly-down {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .fly-down {
    animation: fly-down 500ms forwards;
  }
`;
