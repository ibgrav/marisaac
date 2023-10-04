import { Document } from "../templates/document.tsx";
import { css } from "../utils.tsx";

export function error404() {
  return (
    <Document>
      {css`
        h2 {
          width: 100%;
          font-size: 2em;
          text-align: center;
        }
      `}

      <h2>Error 404: Not Found</h2>
    </Document>
  );
}
