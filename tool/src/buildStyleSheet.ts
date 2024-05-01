import path from "path";
import util from "util";
import { exec } from "child_process";

const asyncExec = util.promisify(exec);

/**
 * Uses tailwind CLI to generate CSS for all the HTML template files and writes
 * it to the docs/ dist folder.
 */
export async function buildStyleSheet(buildOutputFolderPath: string) {
  const outputItemName = "style.css";

  const { stdout, stderr } = await asyncExec(
    `npx tailwindcss -i ./src/template/input.css -o ../docs/${outputItemName} --minify`,
  );

  // Print out *entire* stdout and stderr (buffered) if any
  stdout !== "" && console.log(`[tailwind-stdout] ${stdout}`);
  stderr !== "" && console.log(`[tailwind-stderr] ${stderr}`);

  return path.resolve(buildOutputFolderPath, outputItemName);
}
