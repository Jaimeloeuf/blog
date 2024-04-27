import { isInvalidPostFolder } from "./isInvalidPostFolder";
import { buildPost } from "./buildPost";
import type { Post } from "./Post";

/**
 * Builds all the posts' static sites and return the list of valid (posts +
 * attributes) sorted by newest first.
 */
export async function buildPosts(
  buildOutputFolderPath: string,
  postFolders: Array<string>,
) {
  const validPosts: Array<Post> = [];

  for (const item of postFolders) {
    if (await isInvalidPostFolder(item)) {
      continue;
    }

    const post = await buildPost(buildOutputFolderPath, item);
    if (post !== undefined) {
      validPosts.push(post);
    }
  }

  return validPosts.sort((a, b) => b.date.getTime() - a.date.getTime());
}
