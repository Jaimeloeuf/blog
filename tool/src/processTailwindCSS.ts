import util from "util";
import { exec } from "child_process";

const asyncExec = util.promisify(exec);

/**
 * Uses tailwind CLI to generate CSS for all the HTML layout files and writes it
 * to the docs/ dist folder.
 */
export async function generateOutputCSS() {
  const outputItemName = "style.css";

  const { stdout, stderr } = await asyncExec(
    `npx tailwindcss -i ./src/layout/input.css -o ../docs/${outputItemName} --minify`,
  );

  // Print out *entire* stdout and stderr (buffered) if any
  stdout !== "" && console.log(`[tailwind-stdout] ${stdout}`);
  stderr !== "" && console.log(`[tailwind-stderr] ${stderr}`);

  return outputItemName;
}
