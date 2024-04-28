import { readdir, rm } from "fs/promises";
import { resolve } from "path";
import type { Post } from "./Post";

/**
 * Deletes all the unused files/folders found in output folder once the list of
 * generated valid folder paths are found.
 */
export async function deleteRemovedFilesInOutputFolder(
  posts: Array<Post>,
  buildOutputFolderPath: string,
) {
  const validPaths = new Set(posts.map((post) => post.folderName))
    .add("index.html")
    .add("404.html")
    .add("style.css")
    .add("tags");

  // Remove delete posts or posts whose titles/folder-name have changed
  const buildOutputFolderItems = await readdir(buildOutputFolderPath);
  for (const item of buildOutputFolderItems) {
    if (!validPaths.has(item)) {
      await rm(resolve(buildOutputFolderPath, item), { recursive: true });
    }
  }
}
