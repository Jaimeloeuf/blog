import { resolve } from "path";
import { readFile } from "fs/promises";
import { templateDirPath } from "../utils/dirPaths";
import { genTemplateCreatorFunctionName } from "./genTemplateCreatorFunctionName";

/**
 * Generate a single 'template creator' function code using template file path
 */
export async function genTemplateCreator(templatePath: string) {
  const functionName = genTemplateCreatorFunctionName(templatePath);

  const file = await readFile(resolve(templateDirPath, templatePath), {
    encoding: "utf8",
  });

  const templateVariables = Array.from(
    new Set(file.match(/\$\{([^}]+)\}/g)).values(),
  ).map((templateVariable) => templateVariable.slice(2, -1));

  // Create destructured object params if there are template variables
  const params = templateVariablesParser(templateVariables);

  const JSDoc = `/**\n * Template: src/template/${templatePath}\n */\n`;
  const code = `export const ${functionName} = (${params}) => \`${file}\``;

  return JSDoc + code;
}

/**
 * Create destructured object params for each variable found in template
 */
function templateVariablesParser(templateVariables: Array<string>) {
  if (templateVariables.length === 0) {
    return "";
  }

  const paramType = templateVariables
    .map((variable) => {
      const [variableName, type = "string"] = variable.split(":");
      return `${variableName}: ${type};`;
    })
    .join("");

  return `{${templateVariables.join()}}: {${paramType}}`;
}
