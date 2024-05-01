import { resolve } from "path";
import { buildTagsHomePage } from "./buildTagsHomePage";
import { buildTagsIndividualPages } from "./buildTagsIndividualPages";
import { createFolderIfDoesNotExist } from "./createFolderIfDoesNotExist";
import type { Post } from "./Post";

export async function buildTags(
  buildOutputFolderPath: string,
  posts: Array<Post>,
) {
  const tagsFolderPath = resolve(buildOutputFolderPath, "tags");
  await createFolderIfDoesNotExist(tagsFolderPath);

  const tags = Object.values(posts)
    .map((post) => post.tags)
    .flat()
    .reduce((map, { tag, rawTag }) => {
      const tagObject = map.get(tag) ?? { rawTag, count: 0 };
      tagObject.count++;
      return map.set(tag, tagObject);
    }, new Map<string, { rawTag: string; count: number }>());

  const allTagsPath = await buildTagsHomePage(tagsFolderPath, tags);
  const tagPaths = await buildTagsIndividualPages(tagsFolderPath, posts, tags);

  tagPaths.push(allTagsPath);

  return tagPaths;
}
