import path from "path";
import { readdir, copyFile } from "fs/promises";
import { getConfig } from "../config";

/**
 * Copy over supporting assets like images and attachments.
 */
export async function copyOverAssets(
  postFolderPath: string,
  newFolderPath: string,
) {
  const folderContents = await readdir(postFolderPath, { encoding: "utf8" });

  const assetOutputPaths: Array<string> = [];

  for (const folderContent of folderContents) {
    if (folderContent !== "index.md") {
      const outputPath = path.resolve(newFolderPath, folderContent);
      await copyFile(path.resolve(postFolderPath, folderContent), outputPath);
      assetOutputPaths.push(outputPath);
    }
  }

  // Get the first image asset to be used as main OG image?
  const keyImage = folderContents
    .sort()
    .filter((itemName) => itemName !== "index.md")[0];

  return {
    assetOutputPaths,
    ogpImageMetaTag:
      keyImage !== undefined
        ? `<meta property="og:image" content="${getConfig().baseUrl}/${keyImage}" />`
        : undefined,
  };
}
