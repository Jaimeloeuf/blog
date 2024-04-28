import { readFileSync } from "fs";
import { resolve } from "path";

const allTagsTemplate = readFileSync(
  // Path should be relative to /tool/
  resolve("./src/layout/allTags.html"),
  { encoding: "utf8" },
);

export const generateAllTagsHtml = (tags: string) =>
  allTagsTemplate.replace("${tags}", tags);
