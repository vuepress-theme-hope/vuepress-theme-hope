const fs = require("fs");
const path = require("path");

const packages = fs.readdirSync(path.resolve(__dirname, "packages"));

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", ["demo", "release", ...packages]],
  },
  prompt: {
    customScopesAlign: "top",
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false
  }
};
