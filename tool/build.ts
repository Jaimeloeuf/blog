import { setConfig, build } from "./src";

/**
 * Function to bootstrap the build process and run it directly
 */
async function bootStrap() {
  console.time("Build time");

  setConfig({
    mode: "production",
    baseUrl: "https://blog.jjss.quest",
  });

  await build();

  console.timeEnd("Build time");
}

bootStrap();
