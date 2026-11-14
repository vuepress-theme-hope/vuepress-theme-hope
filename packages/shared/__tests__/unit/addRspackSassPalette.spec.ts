import { describe, expect, it } from "vitest";
import type { App } from "vuepress/core";

import { addRspackSassPalette } from "../../src/node/addRspackSassPalette.js";

interface AdditionalDataContext {
  resourcePath: string;
  rootContext: string;
}

interface SassOptions {
  silenceDeprecations?: string[];
  [key: string]: unknown;
}

interface TestBundlerOptions {
  scss?: {
    additionalData?:
      | string
      | ((content: string, context: AdditionalDataContext) => string | Promise<string>);
    sassOptions?: SassOptions | ((loaderContext: unknown) => SassOptions);
  };
}

const createApp = (bundlerName: string): App =>
  ({ options: { bundler: { name: bundlerName } } }) as unknown as App;

const rspackApp = createApp("@vuepress/bundler-rspack");

const getAdditionalData = (
  bundlerOptions: TestBundlerOptions,
): ((content: string, context: AdditionalDataContext) => Promise<string>) =>
  bundlerOptions.scss?.additionalData as (
    content: string,
    context: AdditionalDataContext,
  ) => Promise<string>;

const context: AdditionalDataContext = {
  resourcePath: "/test.scss",
  rootContext: "/",
};

const getSassOptions = (bundlerOptions: TestBundlerOptions): SassOptions | undefined => {
  const sassOptions = bundlerOptions.scss?.sassOptions;

  return typeof sassOptions === "function" ? sassOptions(context) : sassOptions;
};

describe(addRspackSassPalette, () => {
  it("should do nothing for non-rspack bundlers", () => {
    const bundlerOptions: TestBundlerOptions = { scss: {} };

    addRspackSassPalette(bundlerOptions, createApp("@vuepress/bundler-vite"));

    expect(bundlerOptions.scss).not.toHaveProperty("additionalData");
  });

  it("should inject the sass palette config module", async () => {
    const bundlerOptions: TestBundlerOptions = { scss: {} };

    addRspackSassPalette(bundlerOptions, rspackApp);

    await expect(
      getAdditionalData(bundlerOptions)("@media (max-width: hope-config.$pad) {}", context),
    ).resolves.toBe('@use "@sass-palette/hope-config";\n@media (max-width: hope-config.$pad) {}');
  });

  it("should inject the sass palette palette module", async () => {
    const bundlerOptions: TestBundlerOptions = { scss: {} };

    addRspackSassPalette(bundlerOptions, rspackApp);

    await expect(
      getAdditionalData(bundlerOptions)("hope-palette.$primary;", context),
    ).resolves.toBe('@use "@sass-palette/hope-palette";\nhope-palette.$primary;');
  });

  it("should not inject an already imported module", async () => {
    const content = '@use "@sass-palette/hope-config";\n\nhope-config.$pad;';
    const bundlerOptions: TestBundlerOptions = { scss: {} };

    addRspackSassPalette(bundlerOptions, rspackApp);

    await expect(getAdditionalData(bundlerOptions)(content, context)).resolves.toBe(content);
  });

  it("should keep the existing additionalData and sassOptions", async () => {
    const bundlerOptions: TestBundlerOptions = {
      scss: {
        additionalData: (content: string): string => `/* prefix */\n${content}`,
        sassOptions: { silenceDeprecations: ["legacy-js-api"] },
      },
    };

    addRspackSassPalette(bundlerOptions, rspackApp);

    await expect(getAdditionalData(bundlerOptions)("hope-config.$pad;", context)).resolves.toBe(
      '@use "@sass-palette/hope-config";\n/* prefix */\nhope-config.$pad;',
    );
    expect(getSassOptions(bundlerOptions)?.silenceDeprecations).toStrictEqual([
      "import",
      "legacy-js-api",
    ]);
  });

  it("should keep a function sassOptions", () => {
    const bundlerOptions: TestBundlerOptions = {
      scss: {
        sassOptions: (loaderContext) => ({
          charset: false,
          silenceDeprecations: ["legacy-js-api"],
          seenContext: loaderContext,
        }),
      },
    };

    addRspackSassPalette(bundlerOptions, rspackApp);

    expect(getSassOptions(bundlerOptions)).toStrictEqual({
      charset: false,
      silenceDeprecations: ["import", "legacy-js-api"],
      seenContext: context,
    });
  });
});
