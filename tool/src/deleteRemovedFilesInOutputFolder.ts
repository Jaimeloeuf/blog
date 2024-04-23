import { readdir, rm } from "fs/promises";
import { resolve } from "path";

/**
 * Deletes all the unused files/folders found in output folder once the list of
 * generated valid folder paths are found.
 */
export async function deleteRemovedFilesInOutputFolder(
  validPosts: string[],
  buildOutputFolderPath: string
) {
  const setOfValidPaths = new Set(validPosts).add("index.html");

  // Remove delete posts or posts whose titles/folder-name have changed
  const buildOutputFolderItems = await readdir(buildOutputFolderPath);
  for (const item of buildOutputFolderItems) {
    if (!setOfValidPaths.has(item)) {
      await rm(resolve(buildOutputFolderPath, item), { recursive: true });
    }
  }
}
