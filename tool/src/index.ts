import { readdir } from "fs/promises";
import { createBuildOutputFolder } from "./createBuildOutputFolder";
import { buildPosts } from "./buildPosts";
import { postsDirPath } from "./postsDirPath";
import { buildHomePage } from "./buildHomePage";

async function main() {
  console.time("Build time");

  const buildOutputFolderPath = await createBuildOutputFolder();

  const postFolders = await readdir(postsDirPath);

  const validPosts = await buildPosts(buildOutputFolderPath, postFolders);

  await buildHomePage(buildOutputFolderPath, validPosts);

  console.timeEnd("Build time");
}

main();
