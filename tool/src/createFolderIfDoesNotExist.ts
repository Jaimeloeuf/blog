import { existsSync } from "fs";
import { mkdir } from "fs/promises";

/**
 * Creates a folder using the given path if it does not already exists and
 * returns boolean to indicate if the folder was created.
 */
export async function createFolderIfDoesNotExist(
  folderPath: string
): Promise<boolean> {
  if (!existsSync(folderPath)) {
    await mkdir(folderPath);
    return true;
  }

  return false;
}
