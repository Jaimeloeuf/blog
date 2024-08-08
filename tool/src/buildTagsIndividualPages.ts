import { resolve } from "path";
import { writeFile } from "fs/promises";
import {
  createTagPage,
  createFooterFragment,
  createHeaderFragment,
  createPostCardFragment,
  createScrollToTopButtonFragment,
} from "./__generated";
import { defaultOgpImageMetaTag } from "./utils/defaultOgpImageMetaTag";
import type { Post } from "./types/Post";
import type { Tags } from "./types/Tags";

export async function buildTagsIndividualPages(
  tagsFolderPath: string,
  posts: Array<Post>,
  tags: Tags,
) {
  const tagPagePaths: Array<string> = [];

  // Generate a page for every single tag, to show all posts with that tag
  for (const [tag, { rawTag, count }] of tags) {
    const postCardFragment = posts
      .filter((post) => post.tags.some((postTag) => postTag.tag === tag))
      .map((post) =>
        createPostCardFragment({
          urlPath: post.urlPath,
          title: post.title,
          postDate: post.date.toDateString(),
        }),
      )
      .join("");

    const tagHTML = createTagPage({
      count,
      tag: rawTag,
      posts: postCardFragment,
      ogpImageMetaTags: defaultOgpImageMetaTag,
      headerFragment: createHeaderFragment(),
      scrollToTopButton: createScrollToTopButtonFragment(),
      footer: createFooterFragment(),
    });

    const htmlFilePath = resolve(tagsFolderPath, `${tag}.html`);
    await writeFile(htmlFilePath, tagHTML);

    tagPagePaths.push(htmlFilePath);
  }

  return tagPagePaths;
}
