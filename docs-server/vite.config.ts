import ssl from "@vitejs/plugin-basic-ssl";
import type { UserConfig } from "vite";

export default {
  plugins: [ssl()],

  root: "../docs/",
} satisfies UserConfig;
