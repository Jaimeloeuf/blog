import path from "path";
import { readdir, writeFile } from "fs/promises";
import { templateDirPath, generatedSrcDirPath } from "../utils/dirPaths";
import { logger } from "../../shared/logger";
import { genTemplateCreator } from "./genTemplateCreator";
import { genGeneratedCodeFile } from "./genGeneratedCodeFile";
import * as prettier from "prettier";

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

  const generatedCodeAfterFormatting = await prettier.format(generatedCode, {
    filepath: generatedFilePath, // Define this for prettier to choose parser
    plugins: ["prettier-plugin-tailwindcss"],
  });

  const generatedCodeFile = genGeneratedCodeFile(
    genTemplateCreators,
    generatedCodeAfterFormatting,
  );

  await writeFile(generatedFilePath, generatedCodeFile, { flag: "w" });

  logger.info(genTemplateCreator.name, `Generated '${generatedFilePath}'`);
}

genTemplateCreators();
