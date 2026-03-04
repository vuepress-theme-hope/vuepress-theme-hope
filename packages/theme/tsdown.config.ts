import { getDirname, path } from "vuepress/utils";
import { tsdownConfig } from "../../scripts/tsdown.js";

const __dirname = getDirname(import.meta.url);

export default tsdownConfig(
  Object.fromEntries([
    ["node/index", "src/node/index.ts"],
    ["shared/index", "src/shared/index.ts"],
    ...[
      "client/exports/base",
      "client/exports/blog",
      "client/exports/encrypt",
      "client/exports/noop",
      "client/blog",
      "client/index",
    ].map((file) => [`bundle/${file.slice(7)}`, `src/${file}.ts`]),
  ]),
  {
    alias: {
      "@theme-hope/": path.resolve(__dirname, "./src/client"),
    },
    copy: [["client/styles", "bundle"]],
    moduleSideEffects: (id) =>
      id.endsWith(".css") || id.endsWith(".scss") || id.includes("runTimeCheck"),
  },
);
