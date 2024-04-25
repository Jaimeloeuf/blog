import { exec } from "child_process";

/**
 * Uses tailwind CLI to generate CSS for all the HTML layout files and writes it
 * to the docs/ dist folder.
 */
export function generateOutputCSS() {
  exec(
    "npx tailwindcss -i ./src/layout/input.css -o ../docs/style.css --minify",
    (err, stdout, stderr) => {
      // node couldn't execute the command
      if (err) {
        return;
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`[tailwind] stdout: ${stdout}`);
      console.log(`[tailwind] stderr: ${stderr}`);
    },
  );
}
