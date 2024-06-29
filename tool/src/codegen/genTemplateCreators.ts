import path from "path";
import { readdir, writeFile } from "fs/promises";
import { templateDirPath, generatedSrcDirPath } from "../utils/dirPaths";
import { logger } from "../../shared/logger";
import { genTemplateCreator } from "./genTemplateCreator";
import { genGeneratedCodeFile } from "./genGeneratedCodeFile";

/**
 * Generate 'template creator' functions for all templates
 */
export async function genTemplateCreators() {
  const templateDirItems = await readdir(templateDirPath, { recursive: true });

  const templatePaths = templateDirItems.filter((path) =>
    path.endsWith(".html"),
  );

  const generatedTemplateCreators = await Promise.all(
    templatePaths.map((templatePath) => genTemplateCreator(templatePath)),
  ).then((generatedTemplateCreators) => generatedTemplateCreators.join("\n\n"));

  const generatedCode = generatedTemplateCreators;

  const generatedCodeFile = genGeneratedCodeFile(
    genTemplateCreators,
    generatedCode,
  );

  const generatedFilePath = path.resolve(
    generatedSrcDirPath,
    `templateCreators.ts`,
  );

  await writeFile(generatedFilePath, generatedCodeFile, { flag: "w" });

  logger.info(genTemplateCreator.name, `Generated '${generatedFilePath}'`);
}

genTemplateCreators();
