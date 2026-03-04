import { fs, getDirname, path } from "vuepress/utils";
import { tsdownConfig } from "../../scripts/tsdown.js";

const __dirname = getDirname(import.meta.url);

const presetFiles = (await fs.readdir(path.join(__dirname, "src/presets"))).filter((file) =>
  file.endsWith(".ts"),
);

export default tsdownConfig(
  Object.fromEntries([
    ["node/index", "src/node/index.ts"],
    ...[
      "client/exports/base",
      "client/exports/blog",
      "client/exports/encrypt",
      "client/exports/noop",
      "client/blog",
      "client/index",
    ].map((file) => [`bundle/${file.slice(7)}`, `src/${file}.ts`]),
    ...presetFiles.map((file) => [`presets/${file.slice(0, -3)}`, `src/presets/${file}`]),
  ]),
  {
    alias: {
      "@theme-hope/": path.resolve(__dirname, "./src/client"),
    },
    copy: [["client/styles"], ["presets/**/*.s?css", "presets"]],
    moduleSideEffects: (id) =>
      id.endsWith(".css") || id.endsWith(".scss") || id.includes("runTimeCheck"),
  },
);
