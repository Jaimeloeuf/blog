import { readdir } from "fs/promises";
import { createBuildOutputFolder } from "./createBuildOutputFolder";
import { postsDirPath } from "./postsDirPath";
import { generateOutputCSS } from "./processTailwindCSS";
import { buildPosts } from "./buildPosts";
import { buildHomePage } from "./buildHomePage";
import { buildTags } from "./buildTags";
import { buildNotFoundPage } from "./buildNotFoundPage";
import { buildAssets } from "./buildAssets";
import { deleteRemovedFilesInOutputFolder } from "./deleteRemovedFilesInOutputFolder";
import path from "path";

async function main() {
  console.time("Build time");

  const buildOutputFolderPath = await createBuildOutputFolder();
  const postFolderItems = await readdir(postsDirPath);
  const posts = await buildPosts(buildOutputFolderPath, postFolderItems);

  const homePagePath = await buildHomePage(buildOutputFolderPath, posts);
  await buildTags(buildOutputFolderPath, posts);
  const notFoundPagePath = await buildNotFoundPage(buildOutputFolderPath);
  const assetFilePaths = await buildAssets(buildOutputFolderPath);
  const styleSheetPath = await generateOutputCSS(buildOutputFolderPath);

  await deleteRemovedFilesInOutputFolder(
    buildOutputFolderPath,

    /* All the valid paths to keep */
    homePagePath,
    path.resolve(buildOutputFolderPath, "tags"),
    notFoundPagePath,
    styleSheetPath,
    ...assetFilePaths,
    ...posts.map((post) =>
      path.resolve(buildOutputFolderPath, post.folderName),
    ),
  );

  console.timeEnd("Build time");
}

main();
