import path from "path";
import { writeFile } from "fs/promises";
import { generateHomeHtml } from "./layout/home";
import { generateHomePostCardHtml } from "./layout/components/homePostCard";
import type { Post } from "./Post";

export async function buildHomePage(
  buildOutputFolderPath: string,
  posts: Array<Post>,
) {
  let links = "";
  for (const post of posts) {
    links += generateHomePostCardHtml(
      post.folderName,
      post.title,
      post.date.toDateString(),
    );
  }

  const fullHtmlPage = generateHomeHtml(links);

  const outputItemName = "index.html";

  await writeFile(
    path.resolve(buildOutputFolderPath, outputItemName),
    fullHtmlPage,
    { flag: "w" },
  );

  return outputItemName;
}
