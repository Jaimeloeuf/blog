import { readdir } from "fs/promises";
import { createBuildOutputFolder } from "./createBuildOutputFolder";
import { postsDirPath } from "./postsDirPath";
import { generateOutputCSS } from "./processTailwindCSS";
import { buildPosts } from "./buildPosts";
import { buildHomePage } from "./buildHomePage";
import { buildTags } from "./buildTags";
import { buildNotFoundPage } from "./buildNotFoundPage";
import { deleteRemovedFilesInOutputFolder } from "./deleteRemovedFilesInOutputFolder";

async function main() {
  console.time("Build time");

  const buildOutputFolderPath = await createBuildOutputFolder();
  const postFolderItems = await readdir(postsDirPath);
  const posts = await buildPosts(buildOutputFolderPath, postFolderItems);

  await buildHomePage(buildOutputFolderPath, posts);
  await buildTags(buildOutputFolderPath, posts);
  await buildNotFoundPage(buildOutputFolderPath);
  await generateOutputCSS();

  await deleteRemovedFilesInOutputFolder(
    buildOutputFolderPath,

    /* All the valid paths to keep */

    // Static valid paths
    "index.html",
    "404.html",
    "style.css",
    "tags",

    // Dynamically generated items that are valid
    ...posts.map((post) => post.folderName),
  );

  console.timeEnd("Build time");
}

main();
