import { resolve } from "path";
import { writeFile } from "fs/promises";
import { createHomeTagCardFragment } from "./generateFragment";
import { createAllTagsPage } from "./createPage";
import type { Tags } from "./types/Tags";

export async function buildTagsHomePage(
  tagsFolderPath: string,
  tags: Tags,
  postCount: number,
) {
  const tagCardFragment = new Array(...tags)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([tag, { rawTag, count }]) =>
      createHomeTagCardFragment({ tag, rawTag, count }),
    )
    .join("");

  const allTagPage = createAllTagsPage({
    tagCardFragment,
    postCount,
    tagCount: tags.size,
  });
  const allTagPath = resolve(tagsFolderPath, `index.html`);
  await writeFile(allTagPath, allTagPage, { flag: "w" });

  return allTagPath;
}
