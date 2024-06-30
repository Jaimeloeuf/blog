import { logger } from "../../shared/logger";
import { genTemplateCreators } from "./genTemplateCreators";
import { genCodegenBarrelFile } from "./genCodegenBarrelFile";

async function codegenEntrypoint() {
  logger.info(codegenEntrypoint.name, "Running codegen");

  const templateCreatorPath = await genTemplateCreators();

  await genCodegenBarrelFile(templateCreatorPath);
}

codegenEntrypoint();
