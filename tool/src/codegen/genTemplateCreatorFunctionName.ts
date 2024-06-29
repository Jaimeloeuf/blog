export function genTemplateCreatorFunctionName(templatePath: string) {
  const templatePathComponents = templatePath.split("/");

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

  // Uses camel casing
  const functionName =
    "create" +
    templateFileNameWithoutHtml[0]?.toUpperCase() +
    templateFileNameWithoutHtml.slice(1) +
    templateType[0]?.toUpperCase() +
    templateType.slice(1);

  return functionName;
}
