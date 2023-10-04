import { animations } from "./animations.ts";
import { global } from "./global.ts";
import { header } from "./header.ts";
import { variables } from "./variables.ts";

export function Styles() {
  return (
    <>
      {variables}
      {animations}
      {global}
      {header}
    </>
  );
}
