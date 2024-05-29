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

  const assetOutputPaths: Array<string> = [];

  for (const folderContent of folderContents) {
    if (folderContent !== "index.md") {
      const outputPath = path.resolve(newFolderPath, folderContent);
      await copyFile(path.resolve(postFolderPath, folderContent), outputPath);
      assetOutputPaths.push(outputPath);
    }
  }

  // Get first asset (assume to always be image) to be used as main OG image and
  // ensure it is not 'index.md'
  let keyImage: string | undefined = folderContents.sort()[0];
  if (keyImage === "index.md") {
    keyImage = undefined;
  }

  return { assetOutputPaths, keyImage };
}
