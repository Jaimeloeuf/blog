import path from "path";
import { writeFile } from "fs/promises";
import {
  createFooterFragment,
  createHeaderFragment,
  createHighlightJSFragment,
  createPostPage,
  createScrollToTopButtonFragment,
} from "../__generated";

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
  ogpImageMetaTags: string,
  ogpTagMetaTags: string,
) {
  const fullHtmlPage = createPostPage({
    title,
    date,
    draftModeNotice: draft
      ? `<p class="pb-8 text-2xl font-extralight italic">*** this post is in draft mode ***</p>`
      : "",
    timeToRead,
    tags: tagFragment,
    postContent,
    highlightJS: postContainsCodeblock ? createHighlightJSFragment() : "",
    ogpImageMetaTags,
    ogpTagMetaTags,
    headerFragment: createHeaderFragment(),
    scrollToTopButton: createScrollToTopButtonFragment(),
    footer: createFooterFragment(),
  });

  const htmlFilePath = path.resolve(newFolderPath, `index.html`);
  await writeFile(htmlFilePath, fullHtmlPage, { flag: "w" });
  return htmlFilePath;
}
