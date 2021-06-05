const fs = require("fs");
const path = require("path");

const docs = fs.readdirSync(path.resolve(__dirname, "docs"));
const packages = fs.readdirSync(path.resolve(__dirname, "packages"));

module.exports = {
  settings: {
    "vetur.useWorkspaceDependencies": true,
  },
  projects: [
    ...docs.map((item) => `./docs/${item}`),
    "./demo",
    ...packages.map((item) => `./packages/${item}`),
  ],
};
