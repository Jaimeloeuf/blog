import { readFileSync } from "fs";
import { resolve } from "path";
import { generateHighlightJsHtml } from "./highlightJS";

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
  postContainsCodeblock: boolean,
) =>
  postTemplate
    .replaceAll("${title}", title)
    .replace(
      "${highlightJS}",
      postContainsCodeblock ? generateHighlightJsHtml() : "",
    )
    .replace("${postContent}", postContent)
    .replace("${tags}", tags)
    .replace("${timeToRead}", timeToRead)
    .replace("${date}", date);
