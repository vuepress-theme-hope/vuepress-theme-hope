import { bundle } from "../../scripts/rollup.js";

export default [...bundle("node/index"), ...bundle("client/index")];
