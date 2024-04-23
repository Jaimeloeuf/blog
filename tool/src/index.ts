import { readdir } from "fs/promises";
import { createBuildOutputFolder } from "./createBuildOutputFolder";
import { postsDirPath } from "./postsDirPath";
import { buildPosts } from "./buildPosts";
import { buildHomePage } from "./buildHomePage";
import { deleteRemovedFilesInOutputFolder } from "./deleteRemovedFilesInOutputFolder";

async function main() {
  console.time("Build time");

  const buildOutputFolderPath = await createBuildOutputFolder();

  const postFolders = await readdir(postsDirPath);

  const validPostAttributes = await buildPosts(
    buildOutputFolderPath,
    postFolders
  );

  const validPosts = validPostAttributes
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((validPostAttribute) => validPostAttribute.title);

  await buildHomePage(buildOutputFolderPath, validPosts);

  await deleteRemovedFilesInOutputFolder(validPosts, buildOutputFolderPath);

  console.timeEnd("Build time");
}

main();
