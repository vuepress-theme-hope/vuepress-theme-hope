import { getDirname, path } from "@vuepress/utils";
import { describe, expect, it } from "vitest";

import {
  detectPackageManager,
  hasGlobalInstallation,
} from "../../src/node/utils/packageManager.js";

const __dirname = getDirname(import.meta.url);

const fixtures = path.resolve(__dirname, "./__fixtures__/package-manager");

it("Should detect global package manager", () => {
  expect(hasGlobalInstallation("npm")).toBeTruthy();
  expect(hasGlobalInstallation("pnpm")).toBeTruthy();
});

describe("Should detect lockfile", () => {
  it("Should be npm", () => {
    expect(
      detectPackageManager(path.resolve(fixtures, "lock-file/npm")),
    ).toEqual("npm");
  });

  it("Should be yarn", () => {
    expect(
      detectPackageManager(path.resolve(fixtures, "lock-file/yarn")),
    ).toEqual("yarn");
  });

  it("Should be pnpm", () => {
    expect(
      detectPackageManager(path.resolve(fixtures, "lock-file/pnpm")),
    ).toEqual("pnpm");
  });
});
