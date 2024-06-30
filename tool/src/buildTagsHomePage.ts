import { resolve } from "path";
import { writeFile } from "fs/promises";
import {
  createHomeTagCardFragment,
  createAllTagsPage,
  createHeaderFragment,
  createScrollToTopButtonFragment,
  createFooterFragment,
} from "./__generated";
import { defaultOgpImageMetaTag } from "./utils/defaultOgpImageMetaTag";
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
    tags: tagCardFragment,
    postCount,
    tagCount: tags.size,
    ogpImageMetaTags: defaultOgpImageMetaTag,
    headerFragment: createHeaderFragment(),
    scrollToTopButton: createScrollToTopButtonFragment(),
    footer: createFooterFragment(),
  });

  const allTagPath = resolve(tagsFolderPath, `index.html`);
  await writeFile(allTagPath, allTagPage, { flag: "w" });

  return allTagPath;
}
