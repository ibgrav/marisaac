import { posts } from "src/signals";

export function Home() {
  return (
    <main>
      {posts.value.map((post) => (
        <a href={`/post/${post.fields.slug}`} target="_self">
          <section>
            <h2>{post.fields.title}</h2>
          </section>
        </a>
      ))}
    </main>
  );
}
