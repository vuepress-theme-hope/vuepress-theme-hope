import type { App } from "@vuepress/core";
import { describe, expect, it } from "vitest";

import { getBundlerName } from "../../src/node/bundler/getBundler.js";

describe("Should get bundler name", () => {
  it("Official bundler", () => {
    const app1 = {
      options: {
        bundler: {
          name: "@vuepress/bundler-webpack",
        },
      },
    };
    const app2 = {
      options: {
        bundler: {
          name: "@vuepress/bundler-vite",
        },
      },
    };

    const ans1 = getBundlerName(<App>app1);
    const ans2 = getBundlerName(<App>app2);

    expect(ans1).toBe("webpack");
    expect(ans2).toBe("vite");
  });

  it("3rd party bundler", () => {
    const app1 = {
      options: {
        bundler: {
          name: "vuepress-bundler-snowpack",
        },
      },
    };
    const app2 = {
      options: {
        bundler: {
          name: "vuepress-bundler-turbopack",
        },
      },
    };

    const ans1 = getBundlerName(<App>app1);
    const ans2 = getBundlerName(<App>app2);

    expect(ans1).toBe("vuepress-bundler-snowpack");
    expect(ans2).toBe("vuepress-bundler-turbopack");
  });
});
