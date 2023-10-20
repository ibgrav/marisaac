import { useEffect, useState } from "preact/hooks";
import { contentfulGraphFetch } from "./contentful-graphql";

function gql(strings: TemplateStringsArray, ...args: Array<string | number>): string {
  return strings.reduce((p, n, i) => p + n + (args[i] ?? ""), "");
}

export type ImageAsset = {
  url: string;
  description: string;
  width: number;
  height: number;
};

export type Album = {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  images?: { items: ImageAsset[] };
};

type AlbumsQuery = {
  album: { items: Album[] };
};

const query = gql`
  query Album($preview: Boolean!) {
    album: albumCollection(preview: $preview, order: startDate_DESC) {
      items {
        slug
        title
        startDate
        endDate
        images: imagesCollection(preview: $preview) {
          items {
            url
            width
            height
            description
          }
        }
      }
    }
  }
`;

export function useAlbums() {
  const [data, setData] = useState<Array<Album> | null>(null);

  useEffect(() => {
    contentfulGraphFetch<AlbumsQuery>(query).then(({ data }) => {
      setData(data?.album?.items || []);
    });
  }, []);

  return data;
}
