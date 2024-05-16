import { createServer } from "vite";
import ssl from "@vitejs/plugin-basic-ssl";

/**
 * Start the frontend dev hosting server
 */
export async function startDevServer(buildOutputFolderPath: string) {
  const server = await createServer({
    root: buildOutputFolderPath,
    plugins: [ssl()],

    server: {
      port: 8080,
      host: true,
    },

    // All configs will be defined here, prevent automatic config file search
    configFile: false,
  });

  await server.listen();

  server.printUrls();
  server.bindCLIShortcuts({ print: true });
}
