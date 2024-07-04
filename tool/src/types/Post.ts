import { z } from "zod";

export const PostSchema = z.object({
  title: z.string(),
  date: z.date(),
  pinned: z.boolean().default(false),
  draft: z.boolean().default(false),
  tags: z.array(z.string()),
});

export type PostSchemaType = z.infer<typeof PostSchema>;

export interface Post extends Omit<PostSchemaType, "tags"> {
  /**
   * The generated URL path, which is also the output folder path.
   */
  urlPath: string;

  /**
   * Paths of all the things that are put into the build output folder.
   */
  outputPaths: Array<string>;

  /**
   * Array of rawTag/tag transformed from the original tags.
   */
  tags: Array<{ rawTag: string; tag: string }>;
}
