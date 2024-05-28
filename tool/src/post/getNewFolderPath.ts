import path from "path";
import { createFolderIfDoesNotExist } from "../utils/createFolderIfDoesNotExist";
import { getOutputFolderName } from "../utils/getOutputFolderName";
import { type PostSchemaType } from "../types/Post";

/**
 * Creates the output folder path for this post and create it if it doesn't
 * already exists, and return the newly computed path.
 */
export async function getNewFolderPath(
  buildOutputFolderPath: string,
  postAttributes: PostSchemaType,
  folderPath: string,
) {
  const folderName = getOutputFolderName(postAttributes, folderPath);
  const newFolderPath = path.resolve(buildOutputFolderPath, folderName);
  await createFolderIfDoesNotExist(newFolderPath);
  return { folderName, newFolderPath };
}
