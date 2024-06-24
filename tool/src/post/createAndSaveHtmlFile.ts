import path from "path";
import { writeFile } from "fs/promises";
import { createPostPage } from "../createPage";

/**
 * Create and save the HTML file in the output folder and return its path.
 */
export async function createAndSaveHtmlFile(
  newFolderPath: string,
  title: string,
  date: string,
  draft: boolean,
  timeToRead: string,
  tagFragment: string,
  postContent: string,
  postContainsCodeblock: boolean,
  ogpImageMetaTag: string,
  ogpTagMetaTags: string,
) {
  const fullHtmlPage = createPostPage({
    title,
    date,
    draft,
    timeToRead,
    tagFragment,
    postContent,
    postContainsCodeblock,
    ogpImageMetaTag,
    ogpTagMetaTags,
  });

  const htmlFilePath = path.resolve(newFolderPath, `index.html`);
  await writeFile(htmlFilePath, fullHtmlPage, { flag: "w" });
  return htmlFilePath;
}
