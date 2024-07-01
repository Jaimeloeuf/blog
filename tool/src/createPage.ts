import { rfs } from "./utils/rfs";
import {
  createFooterFragment,
  createHeaderFragment,
  createHighlightJsFragment,
  createScrollToTopButtonFragment,
} from "./createFragment";

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
  rfs("page/post.html")
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
