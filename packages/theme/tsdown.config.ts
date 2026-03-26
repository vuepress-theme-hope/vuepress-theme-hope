import { fs, getDirname, path } from "vuepress/utils";

import { tsdownConfig } from "../../scripts/tsdown.js";

const __dirname = getDirname(import.meta.url);

const presetFiles = (await fs.readdir(path.join(__dirname, "src/presets"))).filter((file) =>
  file.endsWith(".ts"),
);

export default tsdownConfig(
  Object.fromEntries<string>([
    ["node/index", "src/node/index.ts"],
    ...[
      "client/exports/base",
      "client/exports/blog",
      "client/exports/encrypt",
      "client/exports/noop",
      "client/blog",
      "client/index",
    ].map<[string, string]>((file) => [`bundle/${file.slice(7)}`, `src/${file}.ts`]),
    ...presetFiles.map<[string, string]>((file) => [
      `presets/${file.slice(0, -3)}`,
      `src/presets/${file}`,
    ]),
  ]),
  {
    alias: {
      "@theme-hope/": path.resolve(__dirname, "./src/client"),
    },
    copy: [["client/styles"], ["presets/**/*.{css,scss}", "presets"]],
    moduleSideEffects: (id) =>
      id.endsWith(".css") || id.endsWith(".scss") || id.includes("runTimeCheck"),
  },
);
