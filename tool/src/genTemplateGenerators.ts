import { readdir } from "fs/promises";
import { templateDirPath } from "./utils/dirPaths";

/**
 *
 */
export async function genTemplateGenerators() {
  const templateDirItems = await readdir(templateDirPath, { recursive: true });

  const templates = templateDirItems.filter((path) => path.endsWith(".html"));

  for (const template of templates) {
    const templatePathComponents = template.split("/");

    // Generate template type by camel casing the path components
    const templateType =
      (templatePathComponents[0] ?? "") +
      templatePathComponents
        .slice(1, templatePathComponents.length - 1)
        .map(
          (pathComponent) =>
            pathComponent[0]?.toUpperCase() + pathComponent.slice(1),
        );
    if (templateType === undefined) {
      throw new Error("Unable to get template's file type");
    }

    const templateFileName =
      templatePathComponents[templatePathComponents.length - 1];
    if (templateFileName === undefined) {
      throw new Error("Unable to get template's file name");
    }

    const templateFileNameWithoutHtml = templateFileName.slice(
      0,
      templateFileName.length - ".html".length,
    );

    // Capitalise this for camel case with the 'generate' prefix
    const generatedFunctionName =
      "generated" +
      templateFileNameWithoutHtml[0]?.toUpperCase() +
      templateFileNameWithoutHtml.slice(1) +
      templateType[0]?.toUpperCase() +
      templateType.slice(1);

    let generatedCode = `export const ${generatedFunctionName} = () =>
rfs("${template}")`;
  }
}

genTemplateGenerators();
