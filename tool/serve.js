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

nodemonWatcher();

function chokidarWatcher() {
  const { resolve } = require("path");
  const chokidar = require("chokidar");

  const watcher = chokidar.watch(resolve("../posts/**"), { persistent: true });

  watcher
    .on("change", (path) => {
      // Find the parent folder!
      console.log(resolve(path));
    });
}

// chokidarWatcher();
