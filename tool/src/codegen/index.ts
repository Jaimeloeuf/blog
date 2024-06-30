import { logger } from "../../shared/logger";
import { genTemplateCreators } from "./genTemplateCreators";

async function codegenEntrypoint() {
  logger.info(codegenEntrypoint.name, "Running codegen");

  await genTemplateCreators();
}

codegenEntrypoint();
