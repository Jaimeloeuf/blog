import { createServer } from "vite";
import ssl from "@vitejs/plugin-basic-ssl";

/**
 * Start the frontend dev hosting server
 */
export async function startDevServer(buildOutputFolderPath: string) {
  const server = await createServer({
    root: buildOutputFolderPath,
    plugins: [
      ssl({
        // Cache and reuse cert so that on re-runs user do not need to re-accept
        // "use of unsafe self signed cert" in browser everytime.
        // Cache it in the same /tool/dev/ dir instead of top level in tool/
        certDir: "./dev",
      }),
    ],

    server: {
      port: 8080,
      host: true,
      strictPort: true,
    },

    // So that previous logs and logs generated by the tool can be seen.
    clearScreen: false,

    // Defaults to using 'spa' option for now to use the SPA fallback.
    // appType: "mpa",

    // All configs will be defined here, prevent automatic config file search
    configFile: false,
  });

  await server.listen();

  server.printUrls();
  server.bindCLIShortcuts({ print: true });
}
