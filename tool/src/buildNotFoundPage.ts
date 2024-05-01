import path from "path";
import { writeFile } from "fs/promises";
import { generateNotFoundPage } from "./generatePage";

// @todo Might make this a copy operation instead
export async function buildNotFoundPage(buildOutputFolderPath: string) {
  const notFoundPagePath = path.resolve(buildOutputFolderPath, "404.html");
  await writeFile(notFoundPagePath, generateNotFoundPage(), { flag: "w" });

  return notFoundPagePath;
}
