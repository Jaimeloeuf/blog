import path from "path";
import { createFolderIfDoesNotExist } from "../utils/createFolderIfDoesNotExist";
import { createOutputFolderName } from "../utils/createOutputFolderName";
import { type PostSchemaType } from "../types/Post";

/**
 * Creates the URL and output folder path for this post and create it if it
 * doesn't already exists, and return the newly computed path.
 */
export async function createUrlAndFolderPath(
  buildOutputFolderPath: string,
  postAttributes: PostSchemaType,
  folderPath: string,
) {
  const urlPath = createOutputFolderName(postAttributes, folderPath);
  const newFolderPath = path.resolve(buildOutputFolderPath, urlPath);
  await createFolderIfDoesNotExist(newFolderPath);
  return { urlPath, newFolderPath };
}
