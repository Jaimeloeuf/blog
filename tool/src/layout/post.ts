import { readFileSync } from "fs";
import { resolve } from "path";

const postTemplate = readFileSync(
  // Path should be relative to /tool/
  resolve("./src/layout/post.html"),
  { encoding: "utf8" },
);

export const generatePostHtml = (
  title: string,
  date: string,
  timeToRead: string,
  tags: string,
  postContent: string,
) =>
  postTemplate
    .replaceAll("${title}", title)
    .replace("${date}", date)
    .replace("${timeToRead}", timeToRead)
    .replace("${tags}", tags)
    .replace("${postContent}", postContent);
