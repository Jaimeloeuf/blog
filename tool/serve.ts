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
  // Run initial full build first
  await build();

  const watcher = chokidar.watch(resolve("../posts/"), { persistent: true });

  watcher
    .on("change", async (path: string) => {
      const postFolderName = relative("../posts/", path).split("/")[0];

      if (postFolderName === undefined || postFolderName === "") {
        console.log(`Invalid 'postFolderName' parsed from '${path}'`);
        return;
      }

      await buildPost(resolve(`../docs`), postFolderName);
    })
    .on("ready", () => {
      console.log("Initial build complete. Watching files for changes...");
    });
}

chokidarWatcher();
