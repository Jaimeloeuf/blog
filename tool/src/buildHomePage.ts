import path from "path";
import { writeFile } from "fs/promises";
import {
  createPostCardFragment,
  createHomePage,
  createHeaderFragment,
  createSubscribeCardFragment,
  createScrollToTopButtonFragment,
  createFooterFragment,
} from "./__generated";
import { defaultOgpImageMetaTag } from "./utils/defaultOgpImageMetaTag";
import type { Post } from "./types/Post";
import type { Tags } from "./types/Tags";

export async function buildHomePage(
  buildOutputFolderPath: string,
  posts: Array<Post>,
  tags: Tags,
) {
  let postCardFragments = "";
  let pinnedPostCardFragments = "";
  for (const post of posts) {
    const postCardFragment = createPostCardFragment({
      urlPath: post.urlPath,
      title: post.title,
      postDate: post.date.toDateString(),
    });

    if (post.pinned) {
      pinnedPostCardFragments += postCardFragment;
    } else {
      postCardFragments += postCardFragment;
    }
  }

  const fullHtmlPage = createHomePage({
    postLinks: postCardFragments,
    pinnedPostCardFragments,
    postCount: posts.length,
    tagCount: tags.size,
    ogpImageMetaTags: defaultOgpImageMetaTag,
    headerFragment: createHeaderFragment(),
    subscribeCardFragment: createSubscribeCardFragment(),
    scrollToTopButton: createScrollToTopButtonFragment(),
    footer: createFooterFragment(),
  });

  const homePagePath = path.resolve(buildOutputFolderPath, "index.html");
  await writeFile(homePagePath, fullHtmlPage);

  return homePagePath;
}
