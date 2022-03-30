import { rollupTypescript } from "../../scripts/rollup";

export default rollupTypescript("index", {
  dts: false,
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
