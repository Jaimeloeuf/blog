import { resolve } from "path";
import { readFile } from "fs/promises";
import { templateDirPath } from "../utils/dirPaths";
import { genTemplateCreatorFunctionName } from "./genTemplateCreatorFunctionName";
import { parseTemplateForTemplateAndVariables } from "./parseTemplateForTemplateAndVariables";

/**
 * Generate a single 'template creator' function code using template file path
 */
export async function genTemplateCreator(templatePath: string) {
  const functionName = genTemplateCreatorFunctionName(templatePath);

  const file = await readFile(resolve(templateDirPath, templatePath), {
    encoding: "utf8",
  });

  const { templateVariables, templateVariableParamTypes, newFileWithoutTypes } =
    parseTemplateForTemplateAndVariables(file, templatePath);

  // Create destructured object params if there are template variables
  const params =
    templateVariables.length === 0
      ? ""
      : `{${templateVariables.join()}}: {${templateVariableParamTypes.join("")}}`;

  const JSDoc = `/**\n * Template: src/template/${templatePath}\n */\n`;
  const code = `export const ${functionName} = (${params}) => \`${newFileWithoutTypes}\``;

  return JSDoc + code;
}
