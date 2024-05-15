import { resolve, relative } from "path";
import chokidar from "chokidar";
import { build } from "./src/build";
import { buildPost } from "./src/buildPost";
import { isInvalidPostFolder } from "./src/utils/isInvalidPostFolder";

async function chokidarWatcher() {
  // @todo Switch depending on user flag
  const verboseLogger = console.log;

  // Run initial full build first
  await build();

  const watcher = chokidar.watch(resolve("../posts/"), {
    persistent: true,
    ignoreInitial: true,
  });

  watcher
    .on("add", (path) => {
      verboseLogger(`[Added] '${path}'`);
      build();
    })
    .on("unlink", (path) => {
      verboseLogger(`[Removed] '${path}'`);
      build();
    })
    .on("change", async (path: string) => {
      const postFolderName = relative("../posts/", path).split("/")[0];

      if (await isInvalidPostFolder(postFolderName)) {
        return;
      }

      if (postFolderName === undefined || postFolderName === "") {
        verboseLogger(
          `[Change] Invalid 'postFolderName' parsed from '${path}'`,
        );
        return;
      }

      await buildPost(resolve(`../docs`), postFolderName);
    })

    .on("error", (error) => console.error(error))

    .on("ready", () => {
      verboseLogger("Initial build complete. Watching files for changes...");
    });
}

chokidarWatcher();
