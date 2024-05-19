import { logger } from "../shared/logger";
import { build } from "../src/build";
import { chokidarWatcher } from "./serve";

export function fullRebuildOnToolChange() {
  logger.verbose(
    `${chokidarWatcher.name}:tool-change`,
    "Running full re-build on tool change...",
  );
  build();
}
