import { readdir, rm } from "fs/promises";
import { resolve } from "path";

/**
 * Deletes all the unused files/folders found in output folder that are not part
 * of the list of valid items.
 */
export async function deleteRemovedFilesInOutputFolder(
  buildOutputFolderPath: string,
  validItems: Set<string>,
) {
  // Remove delete posts or posts whose titles/folder-name have changed
  const buildOutputFolderItems = await readdir(buildOutputFolderPath, {
    withFileTypes: true,
    recursive: true,
  });

  for (const item of buildOutputFolderItems) {
    if (item.isFile()) {
      const itemPath = resolve(item.path, item.name);
      if (!validItems.has(itemPath)) {
        await rm(itemPath, { recursive: true });
      }
    }
  }
}
