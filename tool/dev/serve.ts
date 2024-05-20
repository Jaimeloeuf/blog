import { resolve, relative } from "path";
import chokidar from "chokidar";
import { chokidarOptions } from "./chokidarOptions";
import { logger } from "../shared/logger";
import { startDevServer } from "./devServer";
import { build } from "../src/build";
import { buildPost } from "../src/buildPost";
import { postsDirPath } from "../src/utils/postsDirPath";
import { isInvalidPostFolder } from "../src/utils/isInvalidPostFolder";
import { fullRebuildOnToolChange } from "./fullRebuildOnToolChange";

async function chokidarWatcher() {
  // Run initial full build first
  const { buildOutputFolderPath } = await build();

  chokidar
    .watch(resolve("../posts/"), chokidarOptions)

    // File added
    .on("add", (path) => {
      logger.verbose(`${chokidarWatcher.name}:added`, path);
      build();
    })

    // File deleted
    .on("unlink", (path) => {
      logger.verbose(`${chokidarWatcher.name}:removed`, path);
      build();
    })

    // Files updated
    .on("change", async (path: string) => {
      const postFolderName = relative(postsDirPath, path).split("/")[0];

      if (await isInvalidPostFolder(postFolderName)) {
        return;
      }

      if (postFolderName === undefined || postFolderName === "") {
        logger.verbose(
          `${chokidarWatcher.name}:change`,
          `Invalid 'postFolderName' parsed from '${path}'`,
        );
        return;
      }

      logger.verbose(
        `${chokidarWatcher.name}:change`,
        `Rebuilding '${postFolderName}'`,
      );

      const post = await buildPost(buildOutputFolderPath, postFolderName);

      // If post failed to build, ignore it
      if (post === undefined) {
        return;
      }
    })

    .on("error", (error) => console.error(error))

    .on("ready", async () => {
      logger.verbose(
        chokidarWatcher.name,
        "Initial build complete. Watching files for changes...",
      );
      await startDevServer(buildOutputFolderPath);
    });

  chokidar
    .watch(resolve("./src/"), chokidarOptions)
    .on("add", fullRebuildOnToolChange)
    .on("unlink", fullRebuildOnToolChange)
    .on("change", fullRebuildOnToolChange)
    .on("error", (error) => console.error(error))
    .on("ready", () =>
      logger.verbose(
        `${chokidarWatcher.name}:tool-watcher`,
        "Initial scan complete. Watching for tool changes...",
      ),
    );
}

chokidarWatcher();
