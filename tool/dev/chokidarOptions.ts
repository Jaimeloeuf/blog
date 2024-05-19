import type chokidar from "chokidar";

export const chokidarOptions: chokidar.WatchOptions = {
  persistent: true,
  ignoreInitial: true,

  // Ensure entire file has been written before reading it
  awaitWriteFinish: {
    stabilityThreshold: 200,
    pollInterval: 100,
  },
};
