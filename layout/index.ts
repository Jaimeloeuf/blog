import { readFileSync } from "fs";
import { resolve } from "path";

const htmlTemplate = readFileSync(
  // Path should be relative to /tool/
  resolve("../layout/index.html"),
  { encoding: "utf8" }
);

export const generateHtml = (
  title: string,
  timeToRead: string,
  postContent: string
) =>
  htmlTemplate
    .replace("${title}", title)
    .replace("${timeToRead}", timeToRead)
    .replace("${postContent}", postContent);
