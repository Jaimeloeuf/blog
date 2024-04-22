import { readFileSync } from "fs";
import { resolve } from "path";

const homeTemplate = readFileSync(
  // Path should be relative to /tool/
  resolve("../layout/home.html"),
  { encoding: "utf8" }
);

export const generateHomeHtml = (content: string) =>
  homeTemplate.replace("${content}", content);

const postTemplate = readFileSync(
  // Path should be relative to /tool/
  resolve("../layout/post.html"),
  { encoding: "utf8" }
);

export const generatePostHtml = (title: string, postContent: string) =>
  postTemplate
    .replace("${title}", title)
    .replace("${postContent}", postContent);
