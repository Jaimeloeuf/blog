import { build } from "./build";

async function bootStrap() {
  console.time("Build time");

  await build();

  console.timeEnd("Build time");
}

bootStrap();
