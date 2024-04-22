import { isInvalidPostFolder } from "./isInvalidPostFolder";
import { buildPost } from "./buildPost";

/**
 * Builds all the posts and return the list of valid posts.
 */
export async function buildPosts(
  buildOutputFolderPath: string,
  postFolders: Array<string>
) {
  const validPosts: Array<string> = [];

  for (const item of postFolders) {
    if (await isInvalidPostFolder(item)) {
      continue;
    }

    await buildPost(buildOutputFolderPath, item);
    validPosts.push(item);
  }

  return validPosts;
}
