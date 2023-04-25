import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}
