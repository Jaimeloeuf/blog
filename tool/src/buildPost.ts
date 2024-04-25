import path from "path";
import { readFile, writeFile, readdir, copyFile } from "fs/promises";
import { marked } from "marked";
import fm from "front-matter";
import { readingTime } from "reading-time-estimator";
import { generatePostHtml } from "./layout/index";
import { createFolderIfDoesNotExist } from "./createFolderIfDoesNotExist";
import { postsDirPath } from "./postsDirPath";
import { getOutputFolderName } from "./getOutputFolderName";
import { PostSchema, type Post } from "./Post";

/**
 * Builds a post's static HTML file from its markdown contents and return the
 * `post` object.
 */
export async function buildPost(
  buildOutputFolderPath: string,
  folderPath: string
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
      postAttributesParseResult.error.message
    );
    return;
  }
  const post = postAttributesParseResult.data;

  // Ensure that minutes is at least 1 min to prevent showing 0
  const minutes = Math.max(1, readingTime(file, 180).minutes);
  const timeToRead = `${minutes} ${minutes > 1 ? "minutes" : "minute"} read`;

  const parsedHTML = await marked.parse(postContent);

  // Add in post title, date and time to read header items.
  const htmlContent =
    `<h1 style="padding-bottom: 1rem; padding-top: 0">${post.title}</h1>` +
    `<p style="padding-bottom: 1rem; font-size: 1rem">${post.date.toDateString()}, &nbsp;${timeToRead}</p>` +
    parsedHTML;

  const fullHtmlPage = generatePostHtml(
    `JJ's blog - ${post.title}`,
    htmlContent
  );

  const newFolderPathName = getOutputFolderName(post, folderPath);
  const newFolderPath = path.resolve(buildOutputFolderPath, newFolderPathName);
  await createFolderIfDoesNotExist(newFolderPath);

  const htmlFilePath = path.resolve(newFolderPath, `index.html`);
  await writeFile(htmlFilePath, fullHtmlPage, { flag: "w" });

  // Copy over all other supporting assets like images and attachments.
  const folderContents = await readdir(postFolderPath, {
    encoding: "utf8",
  });
  for (const folderContent of folderContents) {
    if (folderContent !== "index.md") {
      await copyFile(
        path.resolve(postFolderPath, folderContent),
        path.resolve(newFolderPath, folderContent)
      );
    }
  }

  return { ...post, folderName: newFolderPathName };
}
