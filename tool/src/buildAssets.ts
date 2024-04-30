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
  for (const folderContent of folderContents) {
    await copyFile(
      path.resolve(assetsFolderPath, folderContent),
      path.resolve(buildOutputFolderPath, folderContent),
    );
  }

  return folderContents;
}
