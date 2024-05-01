import { rfs } from "./rfs";

export const generateAllTagsHtml = (tags: string) =>
  rfs("allTags.html").replace("${tags}", tags);
