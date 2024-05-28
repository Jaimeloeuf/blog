import path from "path";
import { readdir, copyFile } from "fs/promises";

/**
 * Copy over supporting assets like images and attachments.
 */
export async function copyOverAssets(
  postFolderPath: string,
  newFolderPath: string,
) {
  const folderContents = await readdir(postFolderPath, { encoding: "utf8" });

  const outputPaths: Array<string> = [];

  for (const folderContent of folderContents) {
    if (folderContent !== "index.md") {
      const outputPath = path.resolve(newFolderPath, folderContent);
      await copyFile(path.resolve(postFolderPath, folderContent), outputPath);
      outputPaths.push(outputPath);
    }
  }

  return outputPaths;
}
