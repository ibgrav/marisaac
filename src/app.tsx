import { Link, Route, Switch } from "wouter";
import { PageHome } from "./pages/home";
import { PageLocation } from "./pages/location";

export function App() {
  return (
    <main>
      <Link href="/">
        <a id="title">
          <h1>Marissa & Isaac's Adventures</h1>
        </a>
      </Link>

      <div class="follow">
        <input placeholder="Enter an Email" />
        <button>Sign Up</button>
      </div>

      <Switch>
        <Route path="/" component={PageHome} />
        <Route component={PageLocation} />
      </Switch>

      <a id="top" href="#title" aria-label="back to top">
        <svg viewBox="0 0 330 330">
          <path d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z" />
        </svg>
      </a>
    </main>
  );
}
