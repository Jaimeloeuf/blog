import { rfs } from "./rfs";
import { generateHighlightJsHtml } from "./components/highlightJS";

export const generatePostHtml = (
  title: string,
  date: string,
  timeToRead: string,
  tags: string,
  postContent: string,
  postContainsCodeblock: boolean,
) =>
  rfs("post.html")
    .replaceAll("${title}", title)
    .replace(
      "${highlightJS}",
      postContainsCodeblock ? generateHighlightJsHtml() : "",
    )
    .replace("${postContent}", postContent)
    .replace("${tags}", tags)
    .replace("${timeToRead}", timeToRead)
    .replace("${date}", date);
