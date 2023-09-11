export type Entry<Id extends string = string, F extends Record<string, unknown> = Record<string, unknown>> = {
  fields: F;
  sys: {
    id: string;
    contentType: { sys: { id: Id } };
  };
};

export type PostEntry = Entry<"post", { title: string; slug: string }>;
