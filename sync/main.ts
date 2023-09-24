import "std/dotenv/load.ts";

import { writePosts } from "./posts.ts";
import { writeGalleries } from "./galleries.ts";

await writePosts();
await writeGalleries();
