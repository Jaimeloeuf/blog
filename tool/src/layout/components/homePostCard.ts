import { readFileSync } from "fs";
import { resolve } from "path";

const homePostCardTemplate = readFileSync(
  // Path should be relative to /tool/
  resolve("./src/layout/components/homePostCard.html"),
  { encoding: "utf8" },
);

export const generateHomePostCardHtml = (
  folderName: string,
  title: string,
  postDate: string,
) =>
  homePostCardTemplate
    .replace("${folderName}", folderName)
    .replace("${title}", title)
    .replace("${postDate}", postDate);
