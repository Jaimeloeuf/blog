import path from "path";
import { writeFile } from "fs/promises";
import { generateHomePage } from "./generatePage";
import { generatePostCardFragment } from "./generateFragment";
import type { Post } from "./Post";

export async function buildHomePage(
  buildOutputFolderPath: string,
  posts: Array<Post>,
) {
  let postCardFragment = "";
  for (const post of posts) {
    postCardFragment += generatePostCardFragment(
      post.folderName,
      post.title,
      post.date.toDateString(),
    );
  }

  const fullHtmlPage = generateHomePage(postCardFragment);

  const homePagePath = path.resolve(buildOutputFolderPath, "index.html");
  await writeFile(homePagePath, fullHtmlPage, { flag: "w" });

  return homePagePath;
}
