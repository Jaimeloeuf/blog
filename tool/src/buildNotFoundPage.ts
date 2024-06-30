import path from "path";
import { writeFile } from "fs/promises";
import {
  create404Page,
  createFooterFragment,
  createHeaderFragment,
} from "./__generated";
import { defaultOgpImageMetaTag } from "./utils/defaultOgpImageMetaTag";

// @todo Might make this a copy operation instead
export async function buildNotFoundPage(buildOutputFolderPath: string) {
  const notFoundPagePath = path.resolve(buildOutputFolderPath, "404.html");

  const file = create404Page({
    headerFragment: createHeaderFragment(),
    footer: createFooterFragment(),
    ogpImageMetaTags: defaultOgpImageMetaTag,
  });

  await writeFile(notFoundPagePath, file, { flag: "w" });

  return notFoundPagePath;
}
