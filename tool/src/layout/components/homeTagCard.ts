import { rfs } from "../rfs";

export const generateHomeTagCardHtml = (
  tag: string,
  rawTag: string,
  count: number,
) =>
  rfs("components/homeTagCard.html")
    .replace("${tag}", tag)
    .replace("${rawTag}", rawTag)
    .replace("${count}", count.toString());
