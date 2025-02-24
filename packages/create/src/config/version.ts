import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

interface PackageJson extends Record<string, unknown> {
  version: string;
  devDependencies: Record<string, string>;
}

const pkg = JSON.parse(
  readFileSync(
    fileURLToPath(
      import.meta.resolve("create-vuepress-theme-hope/package.json"),
    ),
    "utf-8",
  ),
) as PackageJson;

export const vuepressVersion = pkg.devDependencies.vuepress;
export const version = pkg.version;
