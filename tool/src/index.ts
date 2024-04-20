import { readdir } from "fs/promises";
import { createBuildOutputFolder } from "./createBuildOutputFolder";
import { isInvalidPostFolder } from "./isInvalidPostFolder";
import { buildPost } from "./buildPost";
import { postsDirPath } from "./postsDirPath";

async function main() {
  const buildOutputFolderPath = createBuildOutputFolder();

  const postFolders = await readdir(postsDirPath);

  for (const item of postFolders) {
    if (await isInvalidPostFolder(item)) {
      continue;
    }

    await buildPost(buildOutputFolderPath, item);
  }
}

main();
