import { resolve, relative } from "path";
import chokidar from "chokidar";
import { build } from "./src/build";
import { buildPost } from "./src/buildPost";
import { postsDirPath } from "./src/utils/postsDirPath";
import { isInvalidPostFolder } from "./src/utils/isInvalidPostFolder";

async function chokidarWatcher() {
  // @todo Switch depending on user flag
  const verboseLogger = console.log;

  // Run initial full build first
  const { buildOutputFolderPath } = await build();

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
      const postFolderName = relative(postsDirPath, path).split("/")[0];

      if (await isInvalidPostFolder(postFolderName)) {
        return;
      }

      if (postFolderName === undefined || postFolderName === "") {
        verboseLogger(
          `[Change] Invalid 'postFolderName' parsed from '${path}'`,
        );
        return;
      }

      verboseLogger(`[Change] rebuilding '${postFolderName}'`);

      const post = await buildPost(buildOutputFolderPath, postFolderName);

      // If post failed to build, ignore it
      if (post === undefined) {
        return;
      }
    })

    .on("error", (error) => console.error(error))

    .on("ready", () => {
      verboseLogger("Initial build complete. Watching files for changes...");
    });
}

chokidarWatcher();
