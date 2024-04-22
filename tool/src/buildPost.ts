import path from "path";
import { readFile, writeFile, readdir, copyFile } from "fs/promises";
import { marked } from "marked";
import fm from "front-matter";
import { readingTime } from "reading-time-estimator";
import { generatePostHtml } from "../../layout/index";
import { createFolderIfDoesNotExist } from "./createFolderIfDoesNotExist";
import { postsDirPath } from "./postsDirPath";
import { z } from "zod";

const PostAttributes = z.object({
  title: z.string(),
  date: z.date(),
  tags: z.array(z.string()),
});

/**
 * Builds a post's static HTML file from its markdown contents.
 */
export async function buildPost(
  buildOutputFolderPath: string,
  folderPath: string
) {
  const postFolderPath = path.resolve(postsDirPath, folderPath);

  const file = await readFile(path.resolve(postFolderPath, "index.md"), {
    encoding: "utf8",
  });

  const { attributes, body: postContent } = fm(file);

  const postAttributesParseResult = PostAttributes.safeParse(attributes);
  if (!postAttributesParseResult.success) {
    console.error(
      `Invalid post attributes in frontmatter of: '${folderPath}'`,
      postAttributesParseResult.error.message
    );
    return;
  }
  const postAttributes = postAttributesParseResult.data;

  // Ensure that minutes is at least 1 min to prevent showing 0
  const minutes = Math.max(1, readingTime(file, 180).minutes);
  const timeToRead = `${minutes} ${minutes > 1 ? "minutes" : "minute"} read`;

  const parsedHTML = await marked.parse(postContent);

  // Add in post title, date and time to read header items.
  const htmlContent =
    `<h1 style="margin-bottom: 0">${postAttributes.title}</h1>` +
    `<p style="font-size: 1rem">${postAttributes.date.toDateString()}, &nbsp;${timeToRead}</p>` +
    parsedHTML;

  const fullHtmlPage = generatePostHtml(
    `JJ's blog - ${postAttributes.title}`,
    htmlContent
  );

  const newFolderPath = path.resolve(buildOutputFolderPath, folderPath);
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
}
