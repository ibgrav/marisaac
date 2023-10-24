type GraphQLResponse<T> = {
  data: T;
  errors: Array<unknown>;
};

export type Variables = Record<string, string | number | boolean>;

type CachedDate<T> = {
  result: GraphQLResponse<T>;
  ts: number;
};

export async function contentfulGraphFetch<T>(query: string) {
  const preview = location.hostname !== "marisaac.site";
  const token = preview ? import.meta.env.VITE_PREVIEW_TOKEN : import.meta.env.VITE_DELIVERY_TOKEN;

  const cacheKey = JSON.stringify(query);

  if (!preview) {
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      const { result, ts } = JSON.parse(cached) as CachedDate<T>;
      if (ts > Date.now() - 1000 * 60 * 10) return result;
      else sessionStorage.removeItem(cacheKey);
    }
  }

  const url = new URL(
    `/content/v1/spaces/${import.meta.env.VITE_SPACE_ID}/environments/master`,
    "https://graphql.contentful.com"
  );

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ query, variables: { preview } }),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  });

  const result = (await res.json()) as GraphQLResponse<T>;

  if (!preview && result.data) {
    sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), result }));
  }

  if (result.errors) {
    console.error(result.errors);
  }

  return result;
}
