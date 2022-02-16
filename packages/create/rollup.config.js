import { rollupTypescript } from "../../scripts/rollup";

export default rollupTypescript("node/index", {
  external: [
    "@mr-hope/vuepress-shared",
    "cac",
    "execa",
    "fs",
    "https",
    "inquirer",
    "path",
  ],
  preserveShebang: true,
});
