import { resolve, relative } from "path";
import chokidar from "chokidar";
import { chokidarOptions } from "./chokidarOptions";
import { logger } from "../shared/logger";
import { startDevServer } from "./devServer";
import { build } from "../src/build";
import { buildPost } from "../src/buildPost";
import { buildAssets } from "../src/buildAssets";
import {
  postsDirPath,
  templateDirPath,
  assetsDirPath,
} from "../src/utils/dirPaths";
import { isInvalidPostFolder } from "../src/utils/isInvalidPostFolder";
import { fullRebuildOnToolChange } from "./fullRebuildOnToolChange";
import { removeFileFromRfsCache } from "../src/utils/rfs";

async function chokidarWatcher() {
  // Run initial full build first
  const { buildOutputFolderPath, tags } = await build();

  let cachedTags = tags;

  chokidar
    .watch(resolve("../posts/"), chokidarOptions)

    // File added
    .on("add", async (path) => {
      logger.verbose(`${chokidarWatcher.name}:added`, path);
      const { tags } = await build();
      cachedTags = tags;
    })

    // File deleted
    .on("unlink", async (path) => {
      logger.verbose(`${chokidarWatcher.name}:removed`, path);
      const { tags } = await build();
      cachedTags = tags;
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
        "Initial build complete. Watching for Post changes...",
      );
      await startDevServer(buildOutputFolderPath);
    });

  chokidar
    .watch(resolve("./src/"), chokidarOptions)
    .on("add", fullRebuildOnToolChange)
    .on("unlink", fullRebuildOnToolChange)
    .on("change", (path: string) => {
      // If file is a template, only clear `rfs` cache for this file and rebuild
      if (path.includes("/template/")) {
        const templateFileName = relative(templateDirPath, path);

        logger.verbose(
          `chokidarWatcher:tool-change:template`,
          `Clearing template cache for '${templateFileName}' and rebuilding`,
        );

        removeFileFromRfsCache(templateFileName);
        build({ cachedTags });

        return;
      }

      // If file is a static asset, rebuild assets ONLY
      if (path.includes("/assets/")) {
        const assetFileName = relative(assetsDirPath, path);

        logger.verbose(
          `chokidarWatcher:tool-change:assets`,
          `Static asset '${assetFileName}' changed, rebuilding assets only`,
        );

        buildAssets(buildOutputFolderPath);

        return;
      }

      // If it is some other source file change, run the full rebuild
      fullRebuildOnToolChange();
    })
    .on("error", (error) => console.error(error))
    .on("ready", () =>
      logger.verbose(
        `${chokidarWatcher.name}:tool-watcher`,
        "Initial scan complete. Watching for tool changes...",
      ),
    );
}

chokidarWatcher();
