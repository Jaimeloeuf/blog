import path from "path";
import { writeFile } from "fs/promises";
import { generateHomePage } from "./generatePage";
import { generatePostCardFragment } from "./generateFragment";
import type { Post } from "./types/Post";
import type { Tags } from "./types/Tags";

export async function buildHomePage(
  buildOutputFolderPath: string,
  posts: Array<Post>,
  tags: Tags,
) {
  let postCardFragments = "";
  let pinnedPostCardFragments = "";
  for (const post of posts) {
    const postCardFragment = generatePostCardFragment(
      post.folderName,
      post.title,
      post.date.toDateString(),
    );

    if (post.pinned) {
      pinnedPostCardFragments += postCardFragment;
    } else {
      postCardFragments += postCardFragment;
    }
  }

  const fullHtmlPage = generateHomePage({
    postCardFragments,
    pinnedPostCardFragments,
    postCount: posts.length,
    tagCount: tags.size,
  });

  const homePagePath = path.resolve(buildOutputFolderPath, "index.html");
  await writeFile(homePagePath, fullHtmlPage, { flag: "w" });

  return homePagePath;
}
