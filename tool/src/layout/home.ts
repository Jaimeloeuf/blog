import { readFileSync } from "fs";
import { resolve } from "path";

const homeTemplate = readFileSync(
  // Path should be relative to /tool/
  resolve("./src/layout/home.html"),
  { encoding: "utf8" },
);

export const generateHomeHtml = (postLinks: string) =>
  homeTemplate.replace("${postLinks}", postLinks);
