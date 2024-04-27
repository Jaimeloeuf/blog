import { readdir } from "fs/promises";
import { createBuildOutputFolder } from "./createBuildOutputFolder";
import { postsDirPath } from "./postsDirPath";
import { generateOutputCSS } from "./processTailwindCSS";
import { buildPosts } from "./buildPosts";
import { buildHomePage } from "./buildHomePage";
import { buildNotFoundPage } from "./buildNotFoundPage";
import { deleteRemovedFilesInOutputFolder } from "./deleteRemovedFilesInOutputFolder";

async function main() {
  console.time("Build time");

  const buildOutputFolderPath = await createBuildOutputFolder();
  const postFolderItems = await readdir(postsDirPath);
  const posts = await buildPosts(buildOutputFolderPath, postFolderItems);

  await buildHomePage(buildOutputFolderPath, posts);
  await buildNotFoundPage(buildOutputFolderPath);
  await generateOutputCSS();
  await deleteRemovedFilesInOutputFolder(posts, buildOutputFolderPath);

  console.timeEnd("Build time");
}

main();
