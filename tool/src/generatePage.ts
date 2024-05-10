import { rfs } from "./utils/rfs";
import {
  generateHeaderFragment,
  generateHighlightJsFragment,
  generateScrollToTopButtonFragment,
} from "./generateFragment";

export const generateNotFoundPage = () =>
  rfs("pages/404.html").replace("${headerFragment}", generateHeaderFragment());

export const generateAllTagsPage = (
  tagCardFragment: string,
  postCount: number,
  tagCount: number,
) =>
  rfs("pages/allTags.html")
    .replace("${scrollToTopButton}", generateScrollToTopButtonFragment())
    .replace("${tags}", tagCardFragment)
    .replace("${headerFragment}", generateHeaderFragment())
    .replace("${postCount}", postCount.toString())
    .replace("${tagCount}", tagCount.toString());

export const generateHomePage = (postCardFragment: string, postCount: number) =>
  rfs("pages/home.html")
    .replace("${scrollToTopButton}", generateScrollToTopButtonFragment())
    .replace("${postLinks}", postCardFragment)
    .replace("${headerFragment}", generateHeaderFragment())
    .replace("${postCount}", postCount.toString());

export const generatePostPage = (
  title: string,
  date: string,
  timeToRead: string,
  tagFragment: string,
  postContent: string,
  postContainsCodeblock: boolean,
) =>
  rfs("pages/post.html")
    .replaceAll("${title}", title)
    .replace(
      "${highlightJS}",
      postContainsCodeblock ? generateHighlightJsFragment() : "",
    )
    .replace("${scrollToTopButton}", generateScrollToTopButtonFragment())
    .replace("${postContent}", postContent)
    .replace("${tags}", tagFragment)
    .replace("${timeToRead}", timeToRead)
    .replace("${date}", date)
    .replace("${headerFragment}", generateHeaderFragment());

export const generateTagsPage = (
  rawTag: string,
  count: number,
  postCardFragment: string,
) =>
  rfs("pages/tag.html")
    .replaceAll("${tag}", rawTag)
    .replace("${scrollToTopButton}", generateScrollToTopButtonFragment())
    .replace("${count}", count.toString())
    .replace("${posts}", postCardFragment)
    .replace("${headerFragment}", generateHeaderFragment());
