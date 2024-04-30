import path from "path";
import { writeFile } from "fs/promises";
import { generateHomeTagCardHtml } from "./layout/components/homeTagCard";
import { generateAllTagsHtml } from "./layout/allTags";
import { generateTagsHtml } from "./layout/tag";
import { generateHomePostCardHtml } from "./layout/components/homePostCard";
import { createFolderIfDoesNotExist } from "./createFolderIfDoesNotExist";
import type { Post } from "./Post";

type Tags = Map<string, { rawTag: string; count: number }>;

async function buildAllTags(tagsFolderPath: string, tags: Tags) {
  const tagCardHTML = new Array(...tags)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([tag, { rawTag, count }]) =>
      generateHomeTagCardHtml(tag, rawTag, count),
    )
    .join("");

  const allTagHTML = generateAllTagsHtml(tagCardHTML);
  const allTagPath = path.resolve(tagsFolderPath, `index.html`);
  await writeFile(allTagPath, allTagHTML, { flag: "w" });

  return allTagPath;
}

async function buildIndividualTagPage(
  tagsFolderPath: string,
  posts: Array<Post>,
  tags: Tags,
) {
  const tagPagePaths: Array<string> = [];

  // Generate a page for every single tag, to show all posts with that tag
  for (const [tag, { rawTag, count }] of tags) {
    const postCardHTML = posts
      .filter((post) => post.tags.some((postTag) => postTag.tag === tag))
      .map((post) =>
        generateHomePostCardHtml(
          post.folderName,
          post.title,
          post.date.toDateString(),
        ),
      )
      .join("");

    const tagHTML = generateTagsHtml(rawTag, count, postCardHTML);

    const htmlFilePath = path.resolve(tagsFolderPath, `${tag}.html`);
    await writeFile(htmlFilePath, tagHTML, { flag: "w" });

    tagPagePaths.push(htmlFilePath);
  }

  return tagPagePaths;
}

export async function buildTags(
  buildOutputFolderPath: string,
  posts: Array<Post>,
) {
  const tagsFolderPath = path.resolve(buildOutputFolderPath, "tags");
  await createFolderIfDoesNotExist(tagsFolderPath);

  const tags = Object.values(posts)
    .map((post) => post.tags)
    .flat()
    .reduce((map, { tag, rawTag }) => {
      const tagObject = map.get(tag) ?? { rawTag, count: 0 };
      tagObject.count++;
      return map.set(tag, tagObject);
    }, new Map<string, { rawTag: string; count: number }>());

  const allTagsPath = await buildAllTags(tagsFolderPath, tags);
  const tagPaths = await buildIndividualTagPage(tagsFolderPath, posts, tags);

  tagPaths.push(allTagsPath);

  return tagPaths;
}