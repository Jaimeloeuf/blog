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

  // Generate the posts' static sites and sort them by newest first
  const posts = await buildPosts(buildOutputFolderPath, postFolderItems);
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  await buildHomePage(buildOutputFolderPath, posts);

  await buildNotFoundPage(buildOutputFolderPath);

  await deleteRemovedFilesInOutputFolder(posts, buildOutputFolderPath);

  generateOutputCSS();

  console.timeEnd("Build time");
}

main();
