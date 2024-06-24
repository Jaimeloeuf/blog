import path from "path";
import { writeFile } from "fs/promises";
import { createHomePage } from "./generatePage";
import { createPostCardFragment } from "./generateFragment";
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
    const postCardFragment = createPostCardFragment({
      folderName: post.folderName,
      title: post.title,
      postDate: post.date.toDateString(),
    });

    if (post.pinned) {
      pinnedPostCardFragments += postCardFragment;
    } else {
      postCardFragments += postCardFragment;
    }
  }

  const fullHtmlPage = createHomePage({
    postCardFragments,
    pinnedPostCardFragments,
    postCount: posts.length,
    tagCount: tags.size,
  });

  const homePagePath = path.resolve(buildOutputFolderPath, "index.html");
  await writeFile(homePagePath, fullHtmlPage, { flag: "w" });

  return homePagePath;
}
