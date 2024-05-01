import { rfs } from "./rfs";

export const generateTagsHtml = (
  rawTag: string,
  count: number,
  posts: string,
) =>
  rfs("tag.html")
    .replaceAll("${tag}", rawTag)
    .replace("${count}", count.toString())
    .replace("${posts}", posts);
