import path from "path";
import { createFolderIfDoesNotExist } from "../utils/createFolderIfDoesNotExist";
import { createOutputFolderName } from "../utils/createOutputFolderName";
import { type PostSchemaType } from "../types/Post";

/**
 * Creates the output folder path for this post and create it if it doesn't
 * already exists, and return the newly computed path.
 */
export async function createNewFolderPath(
  buildOutputFolderPath: string,
  postAttributes: PostSchemaType,
  folderPath: string,
) {
  const folderName = createOutputFolderName(postAttributes, folderPath);
  const newFolderPath = path.resolve(buildOutputFolderPath, folderName);
  await createFolderIfDoesNotExist(newFolderPath);
  return { folderName, newFolderPath };
}
