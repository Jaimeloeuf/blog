import path from "path";
import { generatePostTagsFragment } from "../generateFragment";
import { postsDirPath } from "../utils/dirPaths";
import { getSafeTagName } from "../utils/getSafeTagName";
import { type Post } from "../types/Post";
import { getPost } from "./getPost";
import { computeTimeToRead } from "./computeTimeToRead";
import { copyOverAssets } from "./copyOverAssets";
import { getNewFolderPath } from "./getNewFolderPath";
import { generateOgpImageMetaTagWithDefaultImage } from "./generateOgpImageMetaTagWithDefaultImage";
import { generateOgpTagMetaTags } from "./generateOgpTagMetaTags";
import { generateAndSaveHtmlFile } from "./generateAndSaveHtmlFile";

/**
 * Builds a post's static HTML file from its markdown contents and return the
 * `post` object.
 */
export async function buildPost(
  buildOutputFolderPath: string,
  folderPath: string,
): Promise<Post | void> {
  const postFolderPath = path.resolve(postsDirPath, folderPath);

  const { postAttributes, postAsMarkdownString, postAsHtmlString } =
    await getPost(postFolderPath);

  const { folderName, newFolderPath } = await getNewFolderPath(
    buildOutputFolderPath,
    postAttributes,
    folderPath,
  );

  const { assetOutputPaths, keyImage } = await copyOverAssets(
    postFolderPath,
    newFolderPath,
  );

  const ogpImageMetaTag = generateOgpImageMetaTagWithDefaultImage(
    folderName,
    postFolderPath,
    keyImage,
  );

  const ogpTagMetaTags = generateOgpTagMetaTags(postAttributes.tags);

  const timeToRead = computeTimeToRead(postAsMarkdownString);

  const tags = postAttributes.tags.map((rawTag) => ({
    rawTag,
    tag: getSafeTagName(rawTag),
  }));

  const tagFragment = tags
    .map(({ tag, rawTag }) => generatePostTagsFragment(tag, rawTag))
    .join("");

  const postContainsCodeblock = postAsHtmlString.includes(
    '<code class="language-',
  );

  const htmlFilePath = await generateAndSaveHtmlFile(
    newFolderPath,
    postAttributes.title,
    postAttributes.date.toDateString(),
    timeToRead,
    tagFragment,
    postAsHtmlString,
    postContainsCodeblock,
    ogpImageMetaTag,
    ogpTagMetaTags,
  );

  return {
    ...postAttributes,
    folderName,
    outputPaths: [htmlFilePath, ...assetOutputPaths],
    tags,
  };
}
