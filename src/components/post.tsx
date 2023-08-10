import { useContentfulInspectorMode, useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useContentfulQuery } from "../lib/use-contentful-query";

interface PostProps {
  slug: string;
}

export function Post({ slug }: PostProps) {
  const { loading, data, error } = useContentfulQuery({ content_type: "post", "fields.slug": slug });
  const post = useContentfulLiveUpdates(data as any);
  const fieldProps = useContentfulInspectorMode({ entryId: data?.sys?.id });

  console.log(post?.fields?.title);

  if (loading) return null;

  return (
    <>
      <h1 {...fieldProps({ fieldId: "title" })}>{post?.fields.title}</h1>
      <section {...fieldProps({ fieldId: "content" })}>{documentToReactComponents(post?.fields?.content)}</section>

      <pre>Data: {data?.fields?.title}</pre>
      <pre>Post: {post?.fields?.title}</pre>
      <pre>{error?.stack}</pre>
    </>
  );
}
