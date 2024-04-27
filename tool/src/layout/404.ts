import { readFileSync } from "fs";
import { resolve } from "path";

const notFoundHtmlFile = readFileSync(
  // Path should be relative to /tool/
  resolve("./src/layout/404.html"),
  { encoding: "utf8" },
);

export const generateNotFoundHtml = () => notFoundHtmlFile;
