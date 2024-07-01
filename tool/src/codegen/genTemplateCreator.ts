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

  const templateVariables = new Set<string>();
  const templateVariableParamTypes = new Set<string>();

  // Strip variable types from file to use it as JS string template, and also
  // saves the variables and types to generate the parameter types of the
  // creator functions later.
  const newFileWithoutTypes = file.replaceAll(
    /\$\{([^}]+)\}/g,
    (rawVariableString) => {
      // Slice out the surrounding ${ }
      const variable = rawVariableString.slice(2, -1);

      // Get variable type from variable definition if any, else default to string
      // type since anything that is string or have .toString() is supported
      const [variableName = "", variableType = "string"] = variable
        .replaceAll(" ", "")
        .split(":");

      // Save the template variable found, using a Set to guarantee uniqueness
      templateVariables.add(variableName);

      // Create the creator function parameter type
      templateVariableParamTypes.add(`${variableName}: ${variableType};`);

      // Add back ${ } but without variable type to use in JS string template
      return `\${${variableName}}`;
    },
  );

  // Create destructured object params if there are template variables
  const params =
    templateVariables.size === 0
      ? ""
      : `{${Array.from(templateVariables).join()}}: {${Array.from(templateVariableParamTypes).join("")}}`;

  const JSDoc = `/**\n * Template: src/template/${templatePath}\n */\n`;
  const code = `export const ${functionName} = (${params}) => \`${newFileWithoutTypes}\``;

  return JSDoc + code;
}
