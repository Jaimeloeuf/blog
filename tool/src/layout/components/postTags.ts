import { readFileSync } from "fs";
import { resolve } from "path";

const postTagsTemplate = readFileSync(
  // Path should be relative to /tool/
  resolve("./src/layout/components/postTags.html"),
  { encoding: "utf8" },
);

export const generatePostTagsHtml = (tag: string, rawTag: string) =>
  postTagsTemplate.replace("${tag}", tag).replace("${rawTag}", rawTag);
