import path from "path";
import { stat } from "fs/promises";
import { postsDirPath } from "./postsDirPath";

/**
 * Checks if the given item within posts/ folder is valid. Returns true if
 * invalid, by treating special folders and standalone files as invalid.
 */
export async function isInvalidPostFolder(postFolderItemName: string) {
  const itemStat = await stat(path.resolve(postsDirPath, postFolderItemName))
    .then((itemStat) => itemStat)
    .catch(() => new Error(`Failed to read stat of: ${postFolderItemName}`));

  if (itemStat instanceof Error) {
    console.error(itemStat);
    return true;
  }

  if (postFolderItemName.startsWith("__") || itemStat.isFile()) {
    return true;
  }
}
