import "@contentful/live-preview/style.css";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import { Dispatch, PropsWithChildren, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface ContentfulProps {
  spaceId: string;
  preview?: boolean;
}

const initialContentfulProps: ContentfulProps = {
  spaceId: import.meta.env.VITE_SPACE_ID,
  preview: true
};

type ContentfulContextState = [ContentfulProps, Dispatch<SetStateAction<ContentfulProps>>];

const ContentfulContext = createContext<ContentfulContextState>([initialContentfulProps, (s) => s]);

export function ContentfulProvider({ children }: PropsWithChildren) {
  const state = useState<ContentfulProps>(initialContentfulProps);

  return (
    <ContentfulContext.Provider value={state}>
      <ContentfulLivePreviewProvider locale="en-US">{children}</ContentfulLivePreviewProvider>
    </ContentfulContext.Provider>
  );
}

export function useContentful() {
  const [state, setState] = useContext(ContentfulContext);

  return {
    ...state
  };
}
