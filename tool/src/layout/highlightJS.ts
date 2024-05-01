import { readFileSync } from "fs";
import { resolve } from "path";

const highlightJsHtmlFile = readFileSync(
  // Path should be relative to /tool/
  resolve("./src/layout/highlightJS.html"),
  { encoding: "utf8" },
);

export const generateHighlightJsHtml = () => highlightJsHtmlFile;
