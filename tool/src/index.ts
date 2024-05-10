import { readdir } from "fs/promises";
import { createBuildOutputFolder } from "./utils/createBuildOutputFolder";
import { postsDirPath } from "./utils/postsDirPath";
import { buildStyleSheet } from "./buildStyleSheet";
import { buildPosts } from "./buildPosts";
import { buildTags } from "./buildTags";
import { buildHomePage } from "./buildHomePage";
import { buildTagPages } from "./buildTagPages";
import { buildNotFoundPage } from "./buildNotFoundPage";
import { buildAssets } from "./buildAssets";
import { deleteRemovedFilesInOutputFolder } from "./deleteRemovedFilesInOutputFolder";

async function main() {
  console.time("Build time");

  const buildOutputFolderPath = await createBuildOutputFolder();
  const postFolderItems = await readdir(postsDirPath);

  const posts = await buildPosts(buildOutputFolderPath, postFolderItems);
  const tags = buildTags(posts);

  const homePagePath = await buildHomePage(buildOutputFolderPath, posts);
  const tagPagePaths = await buildTagPages(buildOutputFolderPath, posts, tags);
  const notFoundPagePath = await buildNotFoundPage(buildOutputFolderPath);
  const assetFilePaths = await buildAssets(buildOutputFolderPath);
  const styleSheetPath = await buildStyleSheet(buildOutputFolderPath);

  await deleteRemovedFilesInOutputFolder(
    buildOutputFolderPath,

    /* All the valid paths to keep */
    homePagePath,
    notFoundPagePath,
    styleSheetPath,
    ...tagPagePaths,
    ...assetFilePaths,
    ...posts.map((post) => post.outputPaths).flat(),
  );

  console.timeEnd("Build time");
}

main();
