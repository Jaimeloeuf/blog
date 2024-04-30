import { readdir, rm } from "fs/promises";
import { resolve } from "path";

/**
 * Deletes all the unused files/folders found in output folder that are not part
 * of the list of valid items.
 */
export async function deleteRemovedFilesInOutputFolder(
  buildOutputFolderPath: string,
  ...validItemNames: Array<string>
) {
  const validItems = new Set(validItemNames);

  // Remove delete posts or posts whose titles/folder-name have changed
  const buildOutputFolderItems = await readdir(buildOutputFolderPath);
  for (const item of buildOutputFolderItems) {
    const itemPath = resolve(buildOutputFolderPath, item);
    if (!validItems.has(itemPath)) {
      await rm(resolve(buildOutputFolderPath, item), { recursive: true });
    }
  }
}
