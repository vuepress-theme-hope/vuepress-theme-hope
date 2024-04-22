const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const packages = fs.readdirSync(path.resolve(__dirname, "packages"));

const scopeComplete = execSync("git status --porcelain || true")
  .toString()
  .trim()
  .split("\n")
  .find((r) => ~r.indexOf("M  packages"))
  ?.replace(/\//g, "%%")
  ?.match(/packages%%((\w|-)*)/)?.[1];

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", ["demo", "release", ...packages]],
  },
  prompt: {
    defaultScope: scopeComplete,
    customScopesAlign: !scopeComplete ? "top" : "bottom",
    allowCustomIssuePrefix: false,
    allowEmptyIssuePrefix: false,
  },
};
