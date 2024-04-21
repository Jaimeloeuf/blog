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
export async function buildPost(buildOutputFolderPath: string, folder: string) {
  const file = await readFile(
    path.resolve(postsDirPath, `${folder}/index.md`),
    { encoding: "utf8" }
  );

  const { body: postContent } = fm(file);

  // Ensure that minutes is at least 1 min to prevent showing 0
  const minutes = Math.max(1, readingTime(file, 180).minutes);
  const timeToRead = `${minutes} ${minutes > 1 ? "minutes" : "minute"} read`;

  const parsedHTML = await marked.parse(postContent);
  const htmlContent = generateHtml("title", parsedHTML);

  const folderPath = path.resolve(buildOutputFolderPath, folder);
  const htmlFilePath = path.resolve(folderPath, `index.html`);

  await createFolderIfDoesNotExist(folderPath);

  await writeFile(htmlFilePath, htmlContent, { flag: "w" });
}
