import { Langs } from "@mr-hope/vuepress-shared";
import resolveConfig from "../../src/node/pluginConfig";

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

    expect((pluginConfig[0] as any)[1].defaultTitle["/"]).toEqual("Info");
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

    expect((pluginConfig[0] as any)[1].defaultTitle["/"]).toEqual("相关信息");
  });
});
