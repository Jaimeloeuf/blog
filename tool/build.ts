import { build } from "./src";

/**
 * Function to bootstrap the build process and run it directly
 */
async function bootStrap() {
  console.time("Build time");

  await build();

  console.timeEnd("Build time");
}

bootStrap();
