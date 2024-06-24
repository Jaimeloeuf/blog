import path from "path";
import { writeFile } from "fs/promises";
import { createSubscribePage } from "./createPage";

export async function buildSubscribePage(buildOutputFolderPath: string) {
  const subscribePagePath = path.resolve(
    buildOutputFolderPath,
    "subscribe.html",
  );
  await writeFile(subscribePagePath, createSubscribePage(), { flag: "w" });

  return subscribePagePath;
}
