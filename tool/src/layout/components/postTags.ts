import { rfs } from "../rfs";

export const generatePostTagsHtml = (tag: string, rawTag: string) =>
  rfs("components/postTags.html")
    .replace("${tag}", tag)
    .replace("${rawTag}", rawTag);
