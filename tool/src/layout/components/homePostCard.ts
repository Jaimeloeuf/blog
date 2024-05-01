import { rfs } from "../rfs";

export const generateHomePostCardHtml = (
  folderName: string,
  title: string,
  postDate: string,
) =>
  rfs("components/homePostCard.html")
    .replace("${folderName}", folderName)
    .replace("${title}", title)
    .replace("${postDate}", postDate);
