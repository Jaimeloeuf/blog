import path from "path";
import { getConfig } from "../config";
import { generatePostTagsFragment } from "../generateFragment";
import { postsDirPath } from "../utils/dirPaths";
import { getSafeTagName } from "../utils/getSafeTagName";
import { getPost } from "./getPost";
import { computeTimeToRead } from "./computeTimeToRead";
import { copyOverAssets } from "./copyOverAssets";
import { getKeyImage } from "./getKeyImage";
import { defaultOgpImageMetaTag } from "../utils/defaultOgpImageMetaTag";
import { generateOgpImageMetaTag } from "../utils/generateOgpImageMetaTag";
import { imageSize } from "image-size";
import { getNewFolderPath } from "./getNewFolderPath";
import { generateOgpTagMetaTags } from "./generateOgpTagMetaTags";
import { generateAndSaveHtmlFile } from "./generateAndSaveHtmlFile";
import { logger } from "../../shared/logger";
import type { Post } from "../types/Post";

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

  if (getConfig().mode === "production" && postAttributes.draft) {
    logger.info(
      buildPost.name,
      `Skipping draft post found in ${getConfig().mode} mode: ${postAttributes.title}`,
    );
    return;
  }

  const { folderName, newFolderPath } = await getNewFolderPath(
    buildOutputFolderPath,
    postAttributes,
    folderPath,
  );

  const { assetOutputPaths } = await copyOverAssets(
    postFolderPath,
    newFolderPath,
  );

  const keyImage = getKeyImage(assetOutputPaths);

  const ogpImageMetaTag =
    keyImage === undefined
      ? defaultOgpImageMetaTag
      : generateOgpImageMetaTag(
          `${folderName}/${keyImage}`,
          imageSize(path.resolve(postFolderPath, keyImage)),
        );

  const ogpTagMetaTags = generateOgpTagMetaTags(postAttributes.tags);

  const timeToRead = computeTimeToRead(postAsMarkdownString);

  const tags = postAttributes.tags.map((rawTag) => ({
    rawTag,
    tag: getSafeTagName(rawTag),
  }));

  const tagFragment = tags.map(generatePostTagsFragment).join("");

  const postContainsCodeblock = postAsHtmlString.includes(
    '<code class="language-',
  );

  const htmlFilePath = await generateAndSaveHtmlFile(
    newFolderPath,
    postAttributes.title,
    postAttributes.date.toDateString(),
    postAttributes.draft,
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
