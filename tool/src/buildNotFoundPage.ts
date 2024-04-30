import path from "path";
import { writeFile } from "fs/promises";
import { generateNotFoundHtml } from "./layout/404";

export async function buildNotFoundPage(buildOutputFolderPath: string) {
  const outputItemName = "404.html";

  await writeFile(
    path.resolve(buildOutputFolderPath, outputItemName),
    generateNotFoundHtml(),
    { flag: "w" },
  );

  return outputItemName;
}
