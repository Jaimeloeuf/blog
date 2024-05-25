import path from "path";
import { readFile, writeFile, readdir, copyFile } from "fs/promises";
import { marked } from "marked";
import fm from "front-matter";
import { readingTime } from "reading-time-estimator";
import { generatePostPage } from "./generatePage";
import {
  generateHrFragment,
  generatePostTagsFragment,
} from "./generateFragment";
import { createFolderIfDoesNotExist } from "./utils/createFolderIfDoesNotExist";
import { postsDirPath } from "./utils/dirPaths";
import { getSafeTagName } from "./utils/getSafeTagName";
import { getOutputFolderName } from "./utils/getOutputFolderName";
import { PostSchema, type Post } from "./types/Post";

marked.use({
  renderer: {
    hr: generateHrFragment,
  },
});

/**
 * Builds a post's static HTML file from its markdown contents and return the
 * `post` object.
 */
export async function buildPost(
  buildOutputFolderPath: string,
  folderPath: string,
): Promise<Post | void> {
  const postFolderPath = path.resolve(postsDirPath, folderPath);

  const file = await readFile(path.resolve(postFolderPath, "index.md"), {
    encoding: "utf8",
  });

  const { attributes, body: postContent } = fm(file);

  const postAttributesParseResult = PostSchema.safeParse(attributes);
  if (!postAttributesParseResult.success) {
    console.error(
      `Invalid post attributes in frontmatter of: '${folderPath}'`,
      postAttributesParseResult.error.message,
    );
    return;
  }
  const post = postAttributesParseResult.data;

  // Ensure that minutes is at least 1 min to prevent showing 0
  const minutes = Math.max(1, readingTime(file, 180).minutes);
  const timeToRead = `${minutes} ${minutes > 1 ? "minutes" : "minute"} read`;

  const parsedHTML = await marked.parse(postContent);

  const tags = post.tags.map((rawTag) => ({
    rawTag,
    tag: getSafeTagName(rawTag),
  }));

  const tagFragment = tags
    .map(({ tag, rawTag }) => generatePostTagsFragment(tag, rawTag))
    .join("");

  const postContainsCodeblock = parsedHTML.includes('<code class="language-');

  const fullHtmlPage = generatePostPage(
    post.title,
    post.date.toDateString(),
    timeToRead,
    tagFragment,
    parsedHTML,
    postContainsCodeblock,
  );

  const folderName = getOutputFolderName(post, folderPath);
  const newFolderPath = path.resolve(buildOutputFolderPath, folderName);
  await createFolderIfDoesNotExist(newFolderPath);

  const htmlFilePath = path.resolve(newFolderPath, `index.html`);
  await writeFile(htmlFilePath, fullHtmlPage, { flag: "w" });

  const outputPaths: Array<string> = [htmlFilePath];

  // Copy over all other supporting assets like images and attachments.
  const folderContents = await readdir(postFolderPath, {
    encoding: "utf8",
  });
  for (const folderContent of folderContents) {
    if (folderContent !== "index.md") {
      const outputPath = path.resolve(newFolderPath, folderContent);
      await copyFile(path.resolve(postFolderPath, folderContent), outputPath);
      outputPaths.push(outputPath);
    }
  }

  return {
    ...post,
    folderName,
    outputPaths,
    tags,
  };
}
