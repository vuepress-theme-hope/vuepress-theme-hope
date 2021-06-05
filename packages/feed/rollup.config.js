import { rollupTypescript } from "../../script/rollup";

export default rollupTypescript("node/index", {
  external: ["@mr-hope/vuepress-shared", "chalk", "fs-extra", "path", "xml-js"],
});
