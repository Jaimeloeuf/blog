import path from "path";
import { readdir, writeFile } from "fs/promises";
import { templateDirPath, generatedSrcDirPath } from "../../utils/dirPaths";
import { logger } from "../../../shared/logger";
import { genTemplateCreator } from "./genTemplateCreator";
import { genGeneratedCodeFile } from "../genGeneratedCodeFile";

/**
 * Generate 'template creator' functions for all templates
 */
export async function genTemplateCreators() {
  const generatedFilePath = path.resolve(
    generatedSrcDirPath,
    `templateCreators.ts`,
  );

  const templateDirItems = await readdir(templateDirPath, { recursive: true });

  const templatePaths = templateDirItems.filter((path) =>
    path.endsWith(".html"),
  );

  const generatedCode = await Promise.all(
    templatePaths.map((templatePath) => genTemplateCreator(templatePath)),
  ).then((generatedTemplateCreators) => generatedTemplateCreators.join("\n\n"));

  const generatedCodeFile = await genGeneratedCodeFile(
    genTemplateCreators,
    generatedCode,
  );

  await writeFile(generatedFilePath, generatedCodeFile);

  logger.info(genTemplateCreator.name, `Generated '${generatedFilePath}'`);

  return generatedFilePath;
}
