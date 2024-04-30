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

async function main() {
  console.time("Build time");

  const buildOutputFolderPath = await createBuildOutputFolder();
  const postFolderItems = await readdir(postsDirPath);
  const posts = await buildPosts(buildOutputFolderPath, postFolderItems);

  const homePage = await buildHomePage(buildOutputFolderPath, posts);
  await buildTags(buildOutputFolderPath, posts);
  const notFound = await buildNotFoundPage(buildOutputFolderPath);
  const staticAssets = await buildAssets(buildOutputFolderPath);
  const styleSheet = await generateOutputCSS();

  await deleteRemovedFilesInOutputFolder(
    buildOutputFolderPath,

    /* All the valid paths to keep */
    homePage,
    "tags",
    notFound,
    styleSheet,
    ...staticAssets,
    ...posts.map((post) => post.folderName),
  );

  console.timeEnd("Build time");
}

main();
