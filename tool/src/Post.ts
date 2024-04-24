import { z } from "zod";

export const PostSchema = z.object({
  title: z.string(),
  date: z.date(),
  tags: z.array(z.string()),
});

export type PostSchemaType = z.infer<typeof PostSchema>;

export interface Post extends PostSchemaType {
  /**
   * Name of the folder, not the full path!
   */
  folderName: string;
}