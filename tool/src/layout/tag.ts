import { readFileSync } from "fs";
import { resolve } from "path";

const tagTemplate = readFileSync(
  // Path should be relative to /tool/
  resolve("./src/layout/tag.html"),
  { encoding: "utf8" },
);

export const generateTagsHtml = (
  rawTag: string,
  count: number,
  posts: string,
) =>
  tagTemplate
    .replaceAll("${tag}", rawTag)
    .replace("${count}", count.toString())
    .replace("${posts}", posts);
