import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index"),
  ...rollupTypescript("client/config"),
];
