import path from "path";
import { writeFile } from "fs/promises";
import { generateNotFoundHtml } from "./layout/index";

export async function buildNotFoundPage(buildOutputFolderPath: string) {
  await writeFile(
    path.resolve(buildOutputFolderPath, "404.html"),
    generateNotFoundHtml(),
    { flag: "w" },
  );
}
