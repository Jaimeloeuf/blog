import path from "path";
import { readdir, copyFile } from "fs/promises";

/**
 * Build static assets content by copying them into build output folder.
 */
export async function buildAssets(buildOutputFolderPath: string) {
  const assetsFolderPath = path.resolve("./src/assets");

  // Copy over all other supporting static assets.
  const folderContents = await readdir(assetsFolderPath, {
    encoding: "utf8",
  });

  const assetFilePaths: Array<string> = [];

  for (const folderContent of folderContents) {
    const outputPath = path.resolve(buildOutputFolderPath, folderContent);

    await copyFile(path.resolve(assetsFolderPath, folderContent), outputPath);

    assetFilePaths.push(outputPath);
  }

  return assetFilePaths;
}
