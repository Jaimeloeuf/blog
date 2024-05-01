import { resolve } from "path";
import { writeFile } from "fs/promises";
import { generatePostCardFragment } from "./generateFragment";
import { generateTagsPage } from "./generatePage";
import type { Post } from "./Post";
import type { Tags } from "./Tags";

export async function buildTagsIndividualPages(
  tagsFolderPath: string,
  posts: Array<Post>,
  tags: Tags,
) {
  const tagPagePaths: Array<string> = [];

  // Generate a page for every single tag, to show all posts with that tag
  for (const [tag, { rawTag, count }] of tags) {
    const postCardFragment = posts
      .filter((post) => post.tags.some((postTag) => postTag.tag === tag))
      .map((post) =>
        generatePostCardFragment(
          post.folderName,
          post.title,
          post.date.toDateString(),
        ),
      )
      .join("");

    const tagHTML = generateTagsPage(rawTag, count, postCardFragment);

    const htmlFilePath = resolve(tagsFolderPath, `${tag}.html`);
    await writeFile(htmlFilePath, tagHTML, { flag: "w" });

    tagPagePaths.push(htmlFilePath);
  }

  return tagPagePaths;
}
