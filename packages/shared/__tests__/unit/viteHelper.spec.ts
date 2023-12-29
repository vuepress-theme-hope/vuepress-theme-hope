import type { App } from "@vuepress/core";
import { expect, it } from "vitest";

import {
  addViteConfig,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteOptimizeDepsNeedsInterop,
  addViteSsrExternal,
  addViteSsrNoExternal,
} from "../../src/node/bundler/vite/index.js";

const appMock = {
  options: {
    bundler: { name: "@vuepress/bundler-vite" },
  },
} as unknown as App;

process.env["OPTIMIZE_DEPS"] = "true";

it("addViteConfig()", () => {
  const config = {};

  addViteConfig(config, appMock, {});

  expect(config).toEqual({
    viteOptions: {},
  });

  addViteConfig(config, appMock, {
    optimizeDeps: {
      include: ["vue"],
    },
  });

  expect(config).toEqual({
    viteOptions: {
      optimizeDeps: {
        include: ["vue"],
      },
    },
  });

  addViteConfig(config, appMock, {
    optimizeDeps: {
      include: ["vue-router"],
    },
  });

  expect(config).toEqual({
    viteOptions: {
      optimizeDeps: {
        include: ["vue", "vue-router"],
      },
    },
  });
});

it("addViteOptimizeDepsInclude()", () => {
  const config = {};

  addViteOptimizeDepsInclude(config, appMock, "vue");

  expect(config).toEqual({
    viteOptions: {
      optimizeDeps: {
        include: ["vue"],
      },
    },
  });

  addViteOptimizeDepsInclude(config, appMock, ["vue-router"]);

  expect(config).toEqual({
    viteOptions: {
      optimizeDeps: {
        include: ["vue", "vue-router"],
      },
    },
  });
});

it("addViteOptimizeDepsExclude()", () => {
  const config = {};

  addViteOptimizeDepsExclude(config, appMock, "vue");

  expect(config).toEqual({
    viteOptions: {
      optimizeDeps: {
        exclude: ["vue"],
      },
    },
  });

  addViteOptimizeDepsExclude(config, appMock, ["vue-router"]);

  expect(config).toEqual({
    viteOptions: {
      optimizeDeps: {
        exclude: ["vue", "vue-router"],
      },
    },
  });
});

it("addViteOptimizeDepsNeedsInterop()", () => {
  const config = {};

  addViteOptimizeDepsNeedsInterop(config, appMock, "vue");

  expect(config).toEqual({
    viteOptions: {
      optimizeDeps: {
        needsInterop: ["vue"],
      },
    },
  });

  addViteOptimizeDepsNeedsInterop(config, appMock, ["vue-router"]);

  expect(config).toEqual({
    viteOptions: {
      optimizeDeps: {
        needsInterop: ["vue", "vue-router"],
      },
    },
  });
});

it("addViteSsrExternal()", () => {
  const config = {};

  addViteSsrExternal(config, appMock, "vue");

  expect(config).toEqual({
    viteOptions: {
      ssr: {
        external: ["vue"],
      },
    },
  });

  addViteSsrExternal(config, appMock, ["vue-router"]);

  expect(config).toEqual({
    viteOptions: {
      ssr: {
        external: ["vue", "vue-router"],
      },
    },
  });
});

it("addViteSsrNoExternal()", () => {
  const config = {};

  addViteSsrNoExternal(config, appMock, "vue");

  expect(config).toEqual({
    viteOptions: {
      ssr: {
        noExternal: ["vue"],
      },
    },
  });

  addViteSsrNoExternal(config, appMock, ["vue-router"]);

  expect(config).toEqual({
    viteOptions: {
      ssr: {
        noExternal: ["vue", "vue-router"],
      },
    },
  });
});
