import path from "path";
import { readdir, copyFile } from "fs/promises";
import { assetsDirPath } from "./utils/assetsDirPath";

/**
 * Build static assets content by copying them into build output folder.
 */
export async function buildAssets(buildOutputFolderPath: string) {
  // Copy over all other supporting static assets.
  const folderContents = await readdir(assetsDirPath, {
    encoding: "utf8",
  });

  const assetFilePaths: Array<string> = [];

  for (const folderContent of folderContents) {
    const outputPath = path.resolve(buildOutputFolderPath, folderContent);

    await copyFile(path.resolve(assetsDirPath, folderContent), outputPath);

    assetFilePaths.push(outputPath);
  }

  return assetFilePaths;
}
