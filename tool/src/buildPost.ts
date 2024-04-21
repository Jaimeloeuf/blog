import path from "path";
import { readFile, writeFile } from "fs/promises";
import { marked } from "marked";
import fm from "front-matter";
import { readingTime } from "reading-time-estimator";
import { generateHtml } from "../../layout/index";
import { createFolderIfDoesNotExist } from "./createFolderIfDoesNotExist";
import { postsDirPath } from "./postsDirPath";

/**
 * Builds a post's static HTML file from its markdown contents.
 */
export async function buildPost(
  buildOutputFolderPath: string,
  folderPath: string
) {
  const file = await readFile(
    path.resolve(postsDirPath, `${folderPath}/index.md`),
    { encoding: "utf8" }
  );

  const { attributes, body: postContent } = fm(file);

  // @todo Add zod validation
  const postAttributes = attributes as {
    title: string;
    date: Date;
    tags: Array<string>;
  };

  // Ensure that minutes is at least 1 min to prevent showing 0
  const minutes = Math.max(1, readingTime(file, 180).minutes);
  const timeToRead = `${minutes} ${minutes > 1 ? "minutes" : "minute"} read`;

  const parsedHTML = await marked.parse(postContent);

  // Add in post title, date and time to read header items.
  const htmlContent =
    `<h1 style="margin-bottom: 0">${postAttributes.title}</h1>` +
    `<p style="font-size: 1rem">${postAttributes.date.toDateString()}, &nbsp;${timeToRead}</p>` +
    parsedHTML;

  const fullHtmlPage = generateHtml(
    `JJ's blog - ${postAttributes.title}`,
    htmlContent
  );

  const newFolderPath = path.resolve(buildOutputFolderPath, folderPath);
  await createFolderIfDoesNotExist(newFolderPath);

  const htmlFilePath = path.resolve(newFolderPath, `index.html`);
  await writeFile(htmlFilePath, fullHtmlPage, { flag: "w" });
}
