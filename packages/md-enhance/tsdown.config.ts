import { tsdownConfig } from "../../scripts/tsdown.js";

export default tsdownConfig(
  [
    "node/index",
    "client/components/CodeDemo",
    "client/components/KotlinPlayground",
    "client/components/MdDemo",
    "client/components/Playground",
    "client/components/SandPack",
    "client/components/VuePlayground",
    "client/index",
  ],
  {
    copy: [["client/styles"]],
  },
);
