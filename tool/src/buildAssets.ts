import path from "path";
import { readdir, cp } from "fs/promises";
import { assetsDirPath } from "./utils/dirPaths";

/**
 * Build static assets content by copying them into build output folder.
 */
export async function buildAssets(buildOutputFolderPath: string) {
  // Copy over all other supporting static assets.
  await cp(path.resolve(assetsDirPath), buildOutputFolderPath, {
    recursive: true,
  });

  // Get all the asset output file paths based on whats in the assets directory
  const assetFilePaths = (
    await readdir(assetsDirPath, { encoding: "utf8", recursive: true })
  ).map((item) => path.resolve(buildOutputFolderPath, item));

  return assetFilePaths;
}
