import path from "path";
import { readFile, writeFile } from "fs/promises";
import { marked } from "marked";
import fm from "front-matter";
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

  const parsedHTML = await marked.parse(postContent);
  const htmlContent = generateHtml("title", parsedHTML);

  const folderPath = path.resolve(buildOutputFolderPath, folder);
  const htmlFilePath = path.resolve(folderPath, `index.html`);

  createFolderIfDoesNotExist(folderPath);

  await writeFile(htmlFilePath, htmlContent, { flag: "w" });
}
