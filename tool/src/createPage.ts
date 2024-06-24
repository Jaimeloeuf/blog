import { rfs } from "./utils/rfs";
import {
  createFooterFragment,
  createHeaderFragment,
  createHighlightJsFragment,
  createScrollToTopButtonFragment,
  createSubscribeCardFragment,
} from "./createFragment";
import { defaultOgpImageMetaTag } from "./utils/defaultOgpImageMetaTag";

export const createNotFoundPage = () =>
  rfs("pages/404.html")
    .replace("${footer}", createFooterFragment())
    .replace("${headerFragment}", createHeaderFragment())
    .replace("${ogpImageMetaTags}", defaultOgpImageMetaTag);

export const createAllTagsPage = ({
  tagCardFragment,
  postCount,
  tagCount,
}: {
  tagCardFragment: string;
  postCount: number;
  tagCount: number;
}) =>
  rfs("pages/allTags.html")
    .replace("${footer}", createFooterFragment())
    .replace("${scrollToTopButton}", createScrollToTopButtonFragment())
    .replace("${tags}", tagCardFragment)
    .replace("${tagCount}", tagCount.toString())
    .replace("${postCount}", postCount.toString())
    .replace("${headerFragment}", createHeaderFragment())
    .replace("${ogpImageMetaTags}", defaultOgpImageMetaTag);

export const createHomePage = ({
  postCardFragments,
  pinnedPostCardFragments,
  postCount,
  tagCount,
}: {
  postCardFragments: string;
  pinnedPostCardFragments: string;
  postCount: number;
  tagCount: number;
}) =>
  rfs("pages/home.html")
    .replace("${footer}", createFooterFragment())
    .replace("${scrollToTopButton}", createScrollToTopButtonFragment())
    .replace("${postLinks}", postCardFragments)
    .replace("${pinnedPostCardFragments}", pinnedPostCardFragments)
    .replace("${tagCount}", tagCount.toString())
    .replace("${postCount}", postCount.toString())
    .replace("${subscribeCardFragment}", createSubscribeCardFragment())
    .replace("${headerFragment}", createHeaderFragment())
    .replace("${ogpImageMetaTags}", defaultOgpImageMetaTag);

export const createPostPage = ({
  title,
  date,
  draft,
  timeToRead,
  tagFragment,
  postContent,
  postContainsCodeblock,
  ogpImageMetaTag,
  ogpTagMetaTags,
}: {
  title: string;
  date: string;
  draft: boolean;
  timeToRead: string;
  tagFragment: string;
  postContent: string;
  postContainsCodeblock: boolean;
  ogpImageMetaTag: string;
  ogpTagMetaTags: string;
}) =>
  rfs("pages/post.html")
    .replaceAll("${title}", title)
    .replaceAll("${date}", date)
    .replace(
      "${highlightJS}",
      postContainsCodeblock ? createHighlightJsFragment() : "",
    )
    .replace("${footer}", createFooterFragment())
    .replace("${scrollToTopButton}", createScrollToTopButtonFragment())
    .replace("${postContent}", postContent)
    .replace("${tags}", tagFragment)
    .replace("${timeToRead}", timeToRead)
    .replace(
      "${draftModeNotice}",
      draft
        ? `<p class="pb-8 text-2xl font-extralight italic">*** this post is in draft mode ***</p>`
        : "",
    )
    .replace("${headerFragment}", createHeaderFragment())
    .replace("${ogpTagMetaTags}", ogpTagMetaTags)
    .replace("${ogpImageMetaTags}", ogpImageMetaTag);

export const createSubscribePage = () =>
  rfs("pages/subscribe.html")
    .replace("${footer}", createFooterFragment())
    .replace("${subscribeCardFragment}", createSubscribeCardFragment())
    .replace("${headerFragment}", createHeaderFragment())
    .replace("${ogpImageMetaTags}", defaultOgpImageMetaTag);

export const createTagsPage = ({
  rawTag,
  count,
  postCardFragment,
}: {
  rawTag: string;
  count: number;
  postCardFragment: string;
}) =>
  rfs("pages/tag.html")
    .replaceAll("${tag}", rawTag)
    .replace("${footer}", createFooterFragment())
    .replace("${scrollToTopButton}", createScrollToTopButtonFragment())
    .replace("${posts}", postCardFragment)
    .replace("${count}", count.toString())
    .replace("${headerFragment}", createHeaderFragment())
    .replace("${ogpImageMetaTags}", defaultOgpImageMetaTag);
