import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import type { CreateLocale } from "./config/index.js";
import { deepAssign } from "./utils/index.js";

interface CreateTsConfigOptions {
  source: string;
  cwd?: string;
  locale: CreateLocale;
}

export const createTsConfig = ({
  source,
  locale,
  cwd = process.cwd(),
}: CreateTsConfigOptions): void => {
  const tsconfigPath = resolve(cwd, "tsconfig.json");

  if (existsSync(tsconfigPath)) {
    console.log(locale.flow.updateTsConfig);

    const tsconfigContent = <Record<string, unknown> & { include?: string[] }>(
      JSON.parse(readFileSync(tsconfigPath, { encoding: "utf-8" }))
    );

    deepAssign(tsconfigContent, {
      compilerOptions: {
        module: "NodeNext",
        moduleResolution: "NodeNext",
      },
      include: [
        ...(tsconfigContent.include ?? []),
        `${source}/.vuepress/**/*.ts`,
        `${source}/.vuepress/**/*.vue`,
      ],
    });

    writeFileSync(
      tsconfigPath,
      `${JSON.stringify(tsconfigContent, null, 2)}\n`,
      { encoding: "utf-8" },
    );
  } else {
    console.log(locale.flow.createTsConfig);

    const tsconfigContent = {
      compilerOptions: {
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2022",
      },
      include: [`${source}/.vuepress/**/*.ts`, `${source}/.vuepress/**/*.vue`],
      exclude: ["node_modules"],
    };

    writeFileSync(
      tsconfigPath,
      `${JSON.stringify(tsconfigContent, null, 2)}\n`,
      { encoding: "utf-8" },
    );
  }
};
