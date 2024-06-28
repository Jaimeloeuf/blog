import { rfs } from "./utils/rfs";

export const createFooterFragment = () => rfs("fragment/footer.html");

export const createHeaderFragment = () => rfs("fragment/header.html");

export const createHighlightJsFragment = () => rfs("fragment/highlightJS.html");

export const createPostCardFragment = ({
  folderName,
  title,
  postDate,
}: {
  folderName: string;
  title: string;
  postDate: string;
}) =>
  rfs("fragment/postCard.html")
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
  rfs("fragment/homeTagCard.html")
    .replace("${tag}", tag)
    .replace("${rawTag}", rawTag)
    .replace("${count}", count.toString());

export const createHrFragment = () => rfs("fragment/hr.html");

export const createPostTagsFragment = ({
  tag,
  rawTag,
}: {
  tag: string;
  rawTag: string;
}) =>
  rfs("fragment/postTags.html")
    .replace("${tag}", tag)
    .replace("${rawTag}", rawTag);

export const createScrollToTopButtonFragment = () =>
  rfs("fragment/scrollToTopButton.html");

export const createSubscribeCardFragment = () =>
  rfs("fragment/subscribeCard.html");
