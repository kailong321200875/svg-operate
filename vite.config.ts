import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
const root = process.cwd();

function pathResolve(dir: string) {
  return resolve(root, ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    extensions: [
      ".mjs",
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
      ".less",
      ".css",
    ],
    alias: [
      {
        find: /\@\//,
        replacement: `${pathResolve("src")}/`,
      },
    ],
  },
});
