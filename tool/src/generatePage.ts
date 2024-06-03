import { rfs } from "./utils/rfs";
import {
  generateHeaderFragment,
  generateHighlightJsFragment,
  generateScrollToTopButtonFragment,
  generateSubscribeCardFragment,
} from "./generateFragment";
import { defaultOgpImageMetaTag } from "./utils/defaultOgpImageMetaTag";

export const generateNotFoundPage = () =>
  rfs("pages/404.html")
    .replace("${headerFragment}", generateHeaderFragment())
    .replace("${ogpImageMetaTags}", defaultOgpImageMetaTag);

export const generateAllTagsPage = (
  tagCardFragment: string,
  postCount: number,
  tagCount: number,
) =>
  rfs("pages/allTags.html")
    .replace("${scrollToTopButton}", generateScrollToTopButtonFragment())
    .replace("${tags}", tagCardFragment)
    .replace("${tagCount}", tagCount.toString())
    .replace("${postCount}", postCount.toString())
    .replace("${headerFragment}", generateHeaderFragment())
    .replace("${ogpImageMetaTags}", defaultOgpImageMetaTag);

export const generateHomePage = (
  postCardFragments: string,
  pinnedPostCardFragments: string,
  postCount: number,
  tagCount: number,
) =>
  rfs("pages/home.html")
    .replace("${scrollToTopButton}", generateScrollToTopButtonFragment())
    .replace("${postLinks}", postCardFragments)
    .replace("${pinnedPostCardFragments}", pinnedPostCardFragments)
    .replace("${tagCount}", tagCount.toString())
    .replace("${postCount}", postCount.toString())
    .replace("${headerFragment}", generateHeaderFragment())
    .replace("${ogpImageMetaTags}", defaultOgpImageMetaTag);

export const generatePostPage = (
  title: string,
  date: string,
  timeToRead: string,
  tagFragment: string,
  postContent: string,
  postContainsCodeblock: boolean,
  ogpImageMetaTag: string,
  ogpTagMetaTags: string,
) =>
  rfs("pages/post.html")
    .replaceAll("${title}", title)
    .replaceAll("${date}", date)
    .replace(
      "${highlightJS}",
      postContainsCodeblock ? generateHighlightJsFragment() : "",
    )
    .replace("${scrollToTopButton}", generateScrollToTopButtonFragment())
    .replace("${postContent}", postContent)
    .replace("${tags}", tagFragment)
    .replace("${timeToRead}", timeToRead)
    .replace("${headerFragment}", generateHeaderFragment())
    .replace("${ogpTagMetaTags}", ogpTagMetaTags)
    .replace("${ogpImageMetaTags}", ogpImageMetaTag);

export const generateSubscribePage = () =>
  rfs("pages/subscribe.html")
    .replace("${subscribeCardFragment}", generateSubscribeCardFragment())
    .replace("${headerFragment}", generateHeaderFragment())
    .replace("${ogpImageMetaTags}", defaultOgpImageMetaTag);

export const generateTagsPage = (
  rawTag: string,
  count: number,
  postCardFragment: string,
) =>
  rfs("pages/tag.html")
    .replaceAll("${tag}", rawTag)
    .replace("${scrollToTopButton}", generateScrollToTopButtonFragment())
    .replace("${posts}", postCardFragment)
    .replace("${count}", count.toString())
    .replace("${headerFragment}", generateHeaderFragment())
    .replace("${ogpImageMetaTags}", defaultOgpImageMetaTag);
