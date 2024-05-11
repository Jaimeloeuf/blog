const nodemon = require("nodemon");

nodemon({
  exec: "npm run build",
  ext: "ts md",
  watch: ["./", "../posts/**/*"],
})
  .on("start", () => console.log("Starting..."))
  .on("restart", () => console.log("Rebuild..."));
