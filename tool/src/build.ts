import { readdir } from "fs/promises";
import { createBuildOutputFolder } from "./utils/createBuildOutputFolder";
import { postsDirPath } from "./utils/dirPaths";
import { buildStyleSheet } from "./buildStyleSheet";
import { buildPosts } from "./buildPosts";
import { buildTags } from "./buildTags";
import { buildHomePage } from "./buildHomePage";
import { buildTagPages } from "./buildTagPages";
import { buildNotFoundPage } from "./buildNotFoundPage";
import { buildAssets } from "./buildAssets";
import { deleteRemovedFilesInOutputFolder } from "./deleteRemovedFilesInOutputFolder";
import type { BuildCache } from "./types/BuildCache";

export async function build(buildCache?: BuildCache) {
  const buildOutputFolderPath =
    buildCache?.buildOutputFolderPath ?? (await createBuildOutputFolder());
  const postFolderItems =
    buildCache?.postFolderItems ?? (await readdir(postsDirPath));

  const posts = await buildPosts(buildOutputFolderPath, postFolderItems);
  const tags = buildCache?.tags ?? buildTags(posts);

  const homePagePath = await buildHomePage(buildOutputFolderPath, posts, tags);
  const tagPagePaths = await buildTagPages(buildOutputFolderPath, posts, tags);
  const notFoundPagePath = await buildNotFoundPage(buildOutputFolderPath);
  const assetFilePaths = await buildAssets(buildOutputFolderPath);
  const styleSheetPath = await buildStyleSheet(buildOutputFolderPath);

  const validPaths = new Set<string>([
    homePagePath,
    notFoundPagePath,
    styleSheetPath,
    ...tagPagePaths,
    ...assetFilePaths,
    ...posts.map((post) => post.outputPaths).flat(),
  ]);

  await deleteRemovedFilesInOutputFolder(buildOutputFolderPath, validPaths);

  return { buildOutputFolderPath, postFolderItems, tags };
}
