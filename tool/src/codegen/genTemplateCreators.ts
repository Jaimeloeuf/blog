import path from "path";
import { readdir, writeFile } from "fs/promises";
import { templateDirPath, generatedSrcDirPath } from "../utils/dirPaths";
import { logger } from "../../shared/logger";
import { genTemplateCreator } from "./genTemplateCreator";

/**
 * Generate 'template creator' functions for all templates
 */
export async function genTemplateCreators() {
  const templateDirItems = await readdir(templateDirPath, { recursive: true });

  const templatePaths = templateDirItems.filter((path) =>
    path.endsWith(".html"),
  );

  const generatedCode = templatePaths
    .map((templatePath) => genTemplateCreator(templatePath))
    .join("\n\n");

  const generatedFilePath = path.resolve(
    generatedSrcDirPath,
    `templateCreators.ts`,
  );

  await writeFile(generatedFilePath, generatedCode, { flag: "w" });

  logger.info(genTemplateCreator.name, `Generated '${generatedFilePath}'`);
}

genTemplateCreators();
