import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

interface PackageJson extends Record<string, unknown> {
  version: string;
  devDependencies: Record<string, string>;
}

const packageJsonPath = fileURLToPath(
  import.meta.resolve("create-vuepress-theme-hope/package.json"),
);
const packageJsonContent = readFileSync(packageJsonPath, "utf-8");

export const packageJSON = JSON.parse(packageJsonContent) as PackageJson;
