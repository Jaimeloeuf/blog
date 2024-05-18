import path from "path";
import { logger } from "../../shared/logger";
import { createFolderIfDoesNotExist } from "./createFolderIfDoesNotExist";

/**
 * Creates the build output folder path if it does not already exists and return
 * the full path to it.
 */
export async function createBuildOutputFolder() {
  const buildOutputFolderPath = path.resolve(`../docs`);

  if (await createFolderIfDoesNotExist(buildOutputFolderPath)) {
    logger.info(
      createBuildOutputFolder.name,
      `Created build output folder '${buildOutputFolderPath}'`,
    );
  } else {
    logger.info(
      createBuildOutputFolder.name,
      `Build output folder already exists, reusing it.`,
    );
  }

  return buildOutputFolderPath;
}
