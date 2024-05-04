import { rfs } from "./utils/rfs";

export const generateHighlightJsFragment = () =>
  rfs("fragments/highlightJS.html");

export const generatePostCardFragment = (
  folderName: string,
  title: string,
  postDate: string,
) =>
  rfs("fragments/postCard.html")
    .replace("${folderName}", folderName)
    .replace("${title}", title)
    .replace("${postDate}", postDate);

export const generateHomeTagCardFragment = (
  tag: string,
  rawTag: string,
  count: number,
) =>
  rfs("fragments/homeTagCard.html")
    .replace("${tag}", tag)
    .replace("${rawTag}", rawTag)
    .replace("${count}", count.toString());

export const generatePostTagsFragment = (tag: string, rawTag: string) =>
  rfs("fragments/postTags.html")
    .replace("${tag}", tag)
    .replace("${rawTag}", rawTag);
