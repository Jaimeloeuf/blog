import { rfs } from "./utils/rfs";

export const createFooterFragment = () => rfs("fragments/footer.html");

export const createHeaderFragment = () => rfs("fragments/header.html");

export const createHighlightJsFragment = () =>
  rfs("fragments/highlightJS.html");

export const createPostCardFragment = ({
  folderName,
  title,
  postDate,
}: {
  folderName: string;
  title: string;
  postDate: string;
}) =>
  rfs("fragments/postCard.html")
    .replace("${folderName}", folderName)
    .replace("${title}", title)
    .replace("${postDate}", postDate);

export const createHomeTagCardFragment = ({
  tag,
  rawTag,
  count,
}: {
  tag: string;
  rawTag: string;
  count: number;
}) =>
  rfs("fragments/homeTagCard.html")
    .replace("${tag}", tag)
    .replace("${rawTag}", rawTag)
    .replace("${count}", count.toString());

export const createHrFragment = () => rfs("fragments/hr.html");

export const createPostTagsFragment = ({
  tag,
  rawTag,
}: {
  tag: string;
  rawTag: string;
}) =>
  rfs("fragments/postTags.html")
    .replace("${tag}", tag)
    .replace("${rawTag}", rawTag);

export const createScrollToTopButtonFragment = () =>
  rfs("fragments/scrollToTopButton.html");

export const createSubscribeCardFragment = () =>
  rfs("fragments/subscribeCard.html");
