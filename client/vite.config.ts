/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />
// import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  //   alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  // },
  // resolve: {
  //   alias: {
  //     "@assets": "/src/assets",
  //     "@components": "/src/components",
  //     "@hooks": "/src/hooks",
  //     "@layouts": "/src/layouts",
  //     "@lib": "/src/lib",
  //     "@pages": "/src/pages",
  //     "@services": "/src/services",
  //     "@utils": "/src/utils",
  //   },
  // },
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setupTest.ts"],
  },
});
