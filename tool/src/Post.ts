import { z } from "zod";

export const PostSchema = z.object({
  title: z.string(),
  date: z.date(),
  tags: z.array(z.string()),
});

export type Post = z.infer<typeof PostSchema>;
