function nodemonWatcher() {
  const nodemon = require("nodemon");

  nodemon({
    exec: "npm run build",
    ext: "ts md",
    watch: ["./", "../posts/**/*"],
  })
    .on("start", () => console.log("Starting..."))
    .on("restart", () => console.log("Rebuild..."));
}

// nodemonWatcher();

import { resolve, relative } from "path";
import chokidar from "chokidar";
import { build } from "./src/build";
import { buildPost } from "./src/buildPost";

async function chokidarWatcher() {
  // @todo Switch depending on user flag
  const verboseLogger = console.log;

  // Run initial full build first
  await build();

  const watcher = chokidar.watch(resolve("../posts/"), { persistent: true });

  watcher
    .on("change", async (path: string) => {
      const postFolderName = relative("../posts/", path).split("/")[0];

      if (postFolderName === undefined || postFolderName === "") {
        verboseLogger(
          `[Change] Invalid 'postFolderName' parsed from '${path}'`,
        );
        return;
      }

      await buildPost(resolve(`../docs`), postFolderName);
    })
    .on("ready", () => {
      verboseLogger("Initial build complete. Watching files for changes...");
    });
}

chokidarWatcher();
