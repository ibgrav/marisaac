import { ContentfulProvider } from "../lib/use-contentful";
import { Post } from "./post";

export function App() {
  return (
    <ContentfulProvider>
      <main>hi</main>
      <Post slug="my-first-post" />
    </ContentfulProvider>
  );
}
