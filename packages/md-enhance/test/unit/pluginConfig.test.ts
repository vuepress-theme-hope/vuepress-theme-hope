import { describe, it } from "mocha";
import { expect } from "chai";
import { Langs } from "@mr-hope/vuepress-shared-utils";
import resolveConfig from "../../lib/pluginConfig";

describe("Test pluginConfig generate", () => {
  it("Should use plugin options first", () => {
    const option = {
      enableAll: true,
    };

    const themeConfig = {
      markdown: {
        enableAll: false,
      },
    };

    const pluginConfig = resolveConfig(option, themeConfig);

    expect((pluginConfig[0] as any)[1].defaultTitle["/"]).to.be.equal("Info");
  });

  it("should handle baseLang option", () => {
    const option = {
      enableAll: true,
    };

    const themeConfig = {
      baseLang: "zh-CN" as Langs,
      markdown: {
        enableAll: false,
      },
    };

    const pluginConfig = resolveConfig(option, themeConfig);

    expect((pluginConfig[0] as any)[1].defaultTitle["/"]).to.be.equal(
      "相关信息"
    );
  });
});
