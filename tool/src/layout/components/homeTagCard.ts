import { readFileSync } from "fs";
import { resolve } from "path";

const homeTagCardTemplate = readFileSync(
  // Path should be relative to /tool/
  resolve("./src/layout/components/homeTagCard.html"),
  { encoding: "utf8" },
);

export const generateHomeTagCardHtml = (
  tag: string,
  rawTag: string,
  count: number,
) =>
  homeTagCardTemplate
    .replace("${tag}", tag)
    .replace("${rawTag}", rawTag)
    .replace("${count}", count.toString());
