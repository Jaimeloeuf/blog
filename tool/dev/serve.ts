import { resolve, relative } from "path";
import chokidar from "chokidar";
import { logger } from "../shared/logger";
import { startDevServer } from "./devServer";
import { build } from "../src/build";
import { buildPost } from "../src/buildPost";
import { postsDirPath } from "../src/utils/postsDirPath";
import { isInvalidPostFolder } from "../src/utils/isInvalidPostFolder";

async function chokidarWatcher() {
  // Run initial full build first
  const { buildOutputFolderPath } = await build();

  const watcher = chokidar.watch(resolve("../posts/"), {
    persistent: true,
    ignoreInitial: true,

    // Ensure entire file has been written before reading it
    awaitWriteFinish: {
      stabilityThreshold: 200,
      pollInterval: 100,
    },
  });

  watcher
    // File added
    .on("add", async (path) => {
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
}

chokidarWatcher();
