import path from "path";
import { writeFile } from "fs/promises";
import { generatePostPage } from "../generatePage";

/**
 * Generates and saves the HTML file in the output folder and return its path.
 */
export async function generateAndSaveHtmlFile(
  newFolderPath: string,
  title: string,
  date: string,
  timeToRead: string,
  tagFragment: string,
  postContent: string,
  postContainsCodeblock: boolean,
) {
  const fullHtmlPage = generatePostPage(
    title,
    date,
    timeToRead,
    tagFragment,
    postContent,
    postContainsCodeblock,
  );

  const htmlFilePath = path.resolve(newFolderPath, `index.html`);
  await writeFile(htmlFilePath, fullHtmlPage, { flag: "w" });
  return htmlFilePath;
}
