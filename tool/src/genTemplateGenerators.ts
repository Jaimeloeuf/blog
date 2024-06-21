import { readdir } from "fs/promises";
import { templateDirPath } from "./utils/dirPaths";

/**
 *
 */
export async function genTemplateGenerators() {
  const templateDirItems = await readdir(templateDirPath, { recursive: true });

  const templates = templateDirItems.filter((template) =>
    template.endsWith(".html"),
  );

  for (const template of templates) {
    const [templateType, templateFileName] = template.split("/");
    if (templateType === undefined) {
      throw new Error("Unable to get template's file type");
    }
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
