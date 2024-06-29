import { genTemplateCreatorFunctionName } from "./genTemplateCreatorFunctionName";

/**
 * Generate a single 'template creator' function code using template file path
 */
export async function genTemplateCreator(templatePath: string) {
  const functionName = genTemplateCreatorFunctionName(templatePath);

  return `export const ${functionName} = () =>
rfs("${templatePath}")`;
}
