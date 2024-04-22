import { readdir } from "fs/promises";
import { createBuildOutputFolder } from "./createBuildOutputFolder";
import { buildPosts } from "./buildPosts";
import { postsDirPath } from "./postsDirPath";
import { buildHomePage } from "./buildHomePage";

async function main() {
  console.time("Build time");

  const buildOutputFolderPath = await createBuildOutputFolder();

  const postFolders = await readdir(postsDirPath);

  await buildPosts(buildOutputFolderPath, postFolders);

  await buildHomePage(buildOutputFolderPath, postFolders);

  console.timeEnd("Build time");
}

main();
