import { isInvalidPostFolder } from "./isInvalidPostFolder";
import { buildPost } from "./buildPost";

/**
 * Builds all the posts and return the list of valid posts.
 */
export async function buildPosts(
  buildOutputFolderPath: string,
  postFolders: Array<string>
) {
  const validPosts: Array<
    Exclude<Awaited<ReturnType<typeof buildPost>>, undefined>
  > = [];

  for (const item of postFolders) {
    if (await isInvalidPostFolder(item)) {
      continue;
    }

    const postAttributes = await buildPost(buildOutputFolderPath, item);
    if (postAttributes !== undefined) {
      validPosts.push(postAttributes);
    }
  }

  return validPosts;
}
