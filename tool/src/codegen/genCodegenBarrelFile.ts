import path from "path";
import { writeFile } from "fs/promises";
import { generatedSrcDirPath } from "../utils/dirPaths";
import { logger } from "../../shared/logger";
import { genGeneratedCodeFile } from "./genGeneratedCodeFile";

/**
 * Generate barrel file for all generated files
 */
export async function genCodegenBarrelFile(...paths: Array<string>) {
  const generatedFilePath = path.resolve(generatedSrcDirPath, `index.ts`);

  const generatedCode =
    "// Barrel file\n" +
    paths
      .map((filePath) => {
        const relativePath = path.relative(generatedSrcDirPath, filePath);

        // Always assume it is a TS file so strip off the '.ts'
        const relativePathWithoutExtension = relativePath.slice(
          0,
          relativePath.length - 3,
        );

        return `export * from './${relativePathWithoutExtension}'`;
      })
      .join("\n\n");

  const generatedCodeFile = await genGeneratedCodeFile(
    genCodegenBarrelFile,
    generatedCode,
  );

  await writeFile(generatedFilePath, generatedCodeFile);

  logger.info(genCodegenBarrelFile.name, `Generated '${generatedFilePath}'`);
}
