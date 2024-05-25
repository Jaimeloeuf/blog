import { logger } from "../shared/logger";
import { build } from "../src/build";
import { resetRfsCache } from "../src/utils/rfs";

export function fullRebuildOnToolChange() {
  logger.verbose(
    `chokidarWatcher:tool-change`,
    "Running full re-build on tool change...",
  );
  resetRfsCache();
  build();
}
