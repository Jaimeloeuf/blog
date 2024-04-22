import { readFileSync } from "fs";
import { resolve } from "path";

const postTemplate = readFileSync(
  // Path should be relative to /tool/
  resolve("../layout/post.html"),
  { encoding: "utf8" }
);

export const generatePostHtml = (title: string, postContent: string) =>
  postTemplate
    .replace("${title}", title)
    .replace("${postContent}", postContent);
