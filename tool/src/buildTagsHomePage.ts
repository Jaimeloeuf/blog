import { resolve } from "path";
import { writeFile } from "fs/promises";
import { generateHomeTagCardFragment } from "./generateFragment";
import { generateAllTagsPage } from "./generatePage";
import type { Tags } from "./Tags";

export async function buildTagsHomePage(tagsFolderPath: string, tags: Tags) {
  const tagCardFragment = new Array(...tags)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([tag, { rawTag, count }]) =>
      generateHomeTagCardFragment(tag, rawTag, count),
    )
    .join("");

  const allTagPage = generateAllTagsPage(tagCardFragment);
  const allTagPath = resolve(tagsFolderPath, `index.html`);
  await writeFile(allTagPath, allTagPage, { flag: "w" });

  return allTagPath;
}
