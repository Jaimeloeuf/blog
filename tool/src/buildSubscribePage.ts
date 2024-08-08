import path from "path";
import { writeFile } from "fs/promises";
import {
  createFooterFragment,
  createHeaderFragment,
  createSubscribeCardFragment,
  createSubscribePage,
} from "./__generated";
import { defaultOgpImageMetaTag } from "./utils/defaultOgpImageMetaTag";

export async function buildSubscribePage(buildOutputFolderPath: string) {
  const subscribePagePath = path.resolve(
    buildOutputFolderPath,
    "subscribe.html",
  );

  const file = createSubscribePage({
    ogpImageMetaTags: defaultOgpImageMetaTag,
    headerFragment: createHeaderFragment(),
    subscribeCardFragment: createSubscribeCardFragment(),
    footer: createFooterFragment(),
  });

  await writeFile(subscribePagePath, file);

  return subscribePagePath;
}
