import { rfs } from "./rfs";

export const generateHomeHtml = (postLinks: string) =>
  rfs("home.html").replace("${postLinks}", postLinks);
