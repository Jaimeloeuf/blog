import path from "path";
import { writeFile } from "fs/promises";
import { generateHomeHtml } from "../../layout/index";
import type { Post } from "./Post";

export async function buildHomePage(
  buildOutputFolderPath: string,
  posts: Array<Post>
) {
  let links = "";
  for (const post of posts) {
    links += `<a href="/${post.folderName}/index.html"><p>${post.title}</p></a>`;
  }

  const fullHtmlPage = generateHomeHtml(links);

  await writeFile(
    path.resolve(buildOutputFolderPath, "index.html"),
    fullHtmlPage,
    { flag: "w" }
  );
}
