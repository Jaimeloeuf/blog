import { readFileSync } from "fs";
import { resolve } from "path";

const homeTemplate = readFileSync(
  // Path should be relative to /tool/
  resolve("./src/layout/home.html"),
  { encoding: "utf8" },
);

export const generateHomeHtml = (postLinks: string) =>
  homeTemplate.replace("${postLinks}", postLinks);

const postTemplate = readFileSync(
  // Path should be relative to /tool/
  resolve("./src/layout/post.html"),
  { encoding: "utf8" },
);

export const generatePostHtml = (title: string, postContent: string) =>
  postTemplate
    .replace("${title}", title)
    .replace("${postContent}", postContent);

const notFoundHtmlFile = readFileSync(
  // Path should be relative to /tool/
  resolve("./src/layout/404.html"),
  { encoding: "utf8" },
);

export const generateNotFoundHtml = () => notFoundHtmlFile;
