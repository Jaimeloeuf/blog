import { logger } from "../../../shared/logger";
import { genTemplateCreator } from "./genTemplateCreator";

const validTemplateVariableTypes = ["string", "number", "boolean"];

/**
 * Parses the template to strip out any variable types and to extract out the
 * variables with their type information for generating the function parameters.
 */
export function parseTemplateForTemplateAndVariables(
  file: string,
  templatePath: string,
) {
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

      // Get variable type from variable definition if any, else default to
      // string since anything that is string or have .toString() is supported
      const [variableName = "", variableType = "string"] = variable
        .replaceAll(" ", "")
        .split(":");

      if (!validTemplateVariableTypes.includes(variableType)) {
        logger.info(
          genTemplateCreator.name,
          `Found invalid template variable type: ${rawVariableString}`,
        );
        logger.info(genTemplateCreator.name, `Found in: ${templatePath}`);
        throw new Error(`Invalid template variable type`);
      }

      // Save the template variable found, using a Set to guarantee uniqueness
      templateVariables.add(variableName);

      // Create the creator function parameter type
      templateVariableParamTypes.add(`${variableName}: ${variableType};`);

      // Add back ${ } but without variable type to use in JS string template
      return `\${${variableName}}`;
    },
  );

  return {
    templateVariables: Array.from(templateVariables),
    templateVariableParamTypes: Array.from(templateVariableParamTypes),
    newFileWithoutTypes,
  };
}
