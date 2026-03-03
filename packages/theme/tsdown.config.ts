import { getDirname, path } from "vuepress/utils";
import { tsdownConfig } from "../../scripts/tsdown.js";

const __dirname = getDirname(import.meta.url);

export default tsdownConfig(
  [
    "node/index",
    "client/exports/base",
    "client/exports/blog",
    "client/exports/encrypt",
    "client/exports/noop",
    "client/blog",
    "client/index",
  ],
  {
    alias: {
      "@theme-hope/": path.resolve(__dirname, "./src/client"),
    },
    define: {
      __IS_BUNDLED__: "true",
    },
    copy: [["client/styles"]],
    moduleSideEffects: (id) =>
      id.endsWith(".css") || id.endsWith(".scss") || id.includes("runTimeCheck"),
  },
);
