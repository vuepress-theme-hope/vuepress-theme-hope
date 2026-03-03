import { getDirname, path } from "vuepress/utils";
import { tsdownConfig } from "../../scripts/tsdown.js";

const __dirname = getDirname(import.meta.url);

export default tsdownConfig(
  [
    "node/index",
    Object.fromEntries(
      [
        "client/exports/base",
        "client/exports/blog",
        "client/exports/encrypt",
        "client/exports/noop",
        "client/blog",
        "client/index",
      ].map((file) => [`bundle/${file}`, `src/${file}.ts`]),
    ),
  ],
  {
    alias: {
      "@theme-hope/": path.resolve(__dirname, "./src/client"),
    },
    copy: [["client/styles"]],
    moduleSideEffects: (id) =>
      id.endsWith(".css") || id.endsWith(".scss") || id.includes("runTimeCheck"),
  },
);
