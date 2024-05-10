import { resolve } from "path";
import { buildTagsHomePage } from "./buildTagsHomePage";
import { buildTagsIndividualPages } from "./buildTagsIndividualPages";
import { createFolderIfDoesNotExist } from "./utils/createFolderIfDoesNotExist";
import type { Post } from "./types/Post";
import type { Tags } from "./types/Tags";

export async function buildTagPages(
  buildOutputFolderPath: string,
  posts: Array<Post>,
  tags: Tags,
) {
  const tagsFolderPath = resolve(buildOutputFolderPath, "tags");
  await createFolderIfDoesNotExist(tagsFolderPath);

  const allTagsPath = await buildTagsHomePage(tagsFolderPath, tags);
  const tagPagePaths = await buildTagsIndividualPages(
    tagsFolderPath,
    posts,
    tags,
  );

  tagPagePaths.push(allTagsPath);

  return tagPagePaths;
}
