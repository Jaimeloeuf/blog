import { readdir } from "fs/promises";
import { createBuildOutputFolder } from "./createBuildOutputFolder";
import { isInvalidPostFolder } from "./isInvalidPostFolder";
import { buildPost } from "./buildPost";
import { postsDirPath } from "./postsDirPath";
import { buildHomePage } from "./buildHomePage";

async function main() {
  console.time("Build time");

  const buildOutputFolderPath = await createBuildOutputFolder();

  const postFolders = await readdir(postsDirPath);

  for (const item of postFolders) {
    if (await isInvalidPostFolder(item)) {
      continue;
    }

    await buildPost(buildOutputFolderPath, item);
  }

  await buildHomePage(buildOutputFolderPath, postFolders);

  console.timeEnd("Build time");
}

main();
