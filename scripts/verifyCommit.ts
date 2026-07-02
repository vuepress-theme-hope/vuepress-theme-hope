import { readdirSync, statSync, readFileSync } from "node:fs";
import path from "node:path";

import picocolors from "picocolors";
import { getDirname } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

const getSubDirectories = (dir: string): string[] =>
  readdirSync(dir).filter((item) => statSync(path.join(dir, item)).isDirectory());

const packages = getSubDirectories(path.join(__dirname, "../packages"));

const msgPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(".git/COMMIT_EDITMSG");
const msg = readFileSync(msgPath, "utf-8").trim();

const types = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "perf",
  "test",
  "workflow",
  "build",
  "ci",
  "chore",
  "types",
  "release",
];
const scopes = [...packages, "deps", "demo", "release"];

const commitRE = /^(?:revert: )?(?<type>[^(]*?)(?:\((?<scope>[^)]*?)\))?!?: .{1,50}$/u;

const match = commitRE.exec(msg);

if (!match) {
  console.error(
    `${picocolors.white(picocolors.bgRed(" ERROR "))} ${picocolors.red(
      `invalid commit message format.`,
    )}`,
  );
  // oxlint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

// oxlint-disable-next-line typescript/no-non-null-assertion
const { type } = match.groups!;

if (!types.includes(type)) {
  console.error(
    `${picocolors.white(picocolors.bgRed(" ERROR "))} ${picocolors.red(
      `invalid commit message type: "${type}".`,
    )}`,
  );
  // oxlint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

// oxlint-disable-next-line typescript/no-non-null-assertion
const { scope } = match.groups!;

if (scope && !scopes.includes(scope)) {
  console.error(
    `${picocolors.white(picocolors.bgRed(" ERROR "))} ${picocolors.red(
      `invalid commit message scope: "${scope}".`,
    )}`,
  );
  // oxlint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}
