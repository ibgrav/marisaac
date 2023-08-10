import { useEffect, useState } from "react";
import { useContentful } from "./use-contentful";

type ContentfulQuery = { content_type: string } & { [key: string]: string };

export function useContentfulQuery<D = any>(query: ContentfulQuery) {
  const { spaceId, preview } = useContentful();

  const [data, setData] = useState<D | null>(null);
  const [error, setError] = useState<Error | null>();
  const [loading, setLoading] = useState(false);

  const setContentfulData = async () => {
    if (!error) {
      setLoading(true);

      try {
        const url = new URL(
          `https://${preview ? "preview" : "cdn"}.contentful.com/spaces/${spaceId}/environments/master/entries`
        );

        url.searchParams.set(
          "access_token",
          preview ? import.meta.env.VITE_PREVIEW_TOKEN : import.meta.env.VITE_DELIVERY_TOKEN
        );

        // set query parameters
        Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, value));

        const res = await fetch(url);
        const data = await res.json();

        if (data?.items?.[0]) {
          setData(data.items[0]);
        }
      } catch (e) {
        console.error(e);
        setError(e as Error);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    setContentfulData();
  }, []);

  return { data, error, loading };
}
