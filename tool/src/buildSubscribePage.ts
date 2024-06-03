import path from "path";
import { writeFile } from "fs/promises";
import { generateSubscribePage } from "./generatePage";

export async function buildSubscribePage(buildOutputFolderPath: string) {
  const subscribePagePath = path.resolve(
    buildOutputFolderPath,
    "subscribe.html",
  );
  await writeFile(subscribePagePath, generateSubscribePage(), { flag: "w" });

  return subscribePagePath;
}
