import path from "path";
import { writeFile } from "fs/promises";
import { createNotFoundPage } from "./generatePage";

// @todo Might make this a copy operation instead
export async function buildNotFoundPage(buildOutputFolderPath: string) {
  const notFoundPagePath = path.resolve(buildOutputFolderPath, "404.html");
  await writeFile(notFoundPagePath, createNotFoundPage(), { flag: "w" });

  return notFoundPagePath;
}
