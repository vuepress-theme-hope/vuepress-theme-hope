import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import type { CreateLocale } from "./i18n/index.js";
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
  const tsconfigPath = path.resolve(cwd, "tsconfig.json");
  let tsconfigContent: Record<string, unknown> & { include?: string[] };

  if (existsSync(tsconfigPath)) {
    console.log(locale.flow.updateTsConfig);

    tsconfigContent = JSON.parse(readFileSync(tsconfigPath, { encoding: "utf-8" })) as Record<
      string,
      unknown
    > & { include?: string[] };

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
  } else {
    console.log(locale.flow.createTsConfig);

    tsconfigContent = {
      compilerOptions: {
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2022",
      },
      include: [`${source}/.vuepress/**/*.ts`, `${source}/.vuepress/**/*.vue`],
      exclude: ["node_modules"],
    };
  }

  writeFileSync(tsconfigPath, `${JSON.stringify(tsconfigContent, null, 2)}\n`, {
    encoding: "utf-8",
  });
};
