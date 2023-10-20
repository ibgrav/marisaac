import "./styles/fonts.css";
import "./styles/index.css";

import { render } from "preact";
import { App } from "./app.tsx";

render(<App />, document.getElementById("app")!);
