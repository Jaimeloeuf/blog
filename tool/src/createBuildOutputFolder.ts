import path from "path";
import { createFolderIfDoesNotExist } from "./createFolderIfDoesNotExist";

/**
 * Creates the build output folder path if it does not already exists and return
 * the full path to it.
 */
export function createBuildOutputFolder() {
  const buildOutputFolderPath = path.resolve(`../docs`);

  if (createFolderIfDoesNotExist(buildOutputFolderPath)) {
    console.log(`Created build output folder '${buildOutputFolderPath}'`);
  } else {
    console.log(`Build output folder already exists, reusing it.`);
  }

  return buildOutputFolderPath;
}
