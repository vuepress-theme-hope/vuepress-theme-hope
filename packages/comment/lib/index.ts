import { CommentOptions } from "../types";
import { PluginOptionAPI } from "@mr-hope/vuepress-types";
import { resolve } from "path";

export = (options: CommentOptions): PluginOptionAPI => {
  const config: PluginOptionAPI = {
    name: "comment",

    enhanceAppFiles: resolve(__dirname, "../src/enhanceAppFile.js"),

    define: () => ({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      COMMENT_OPTIONS: options,
    }),

    plugins: [
      ["@mr-hope/reading-time", { wordPerminute: options.wordPerminute }],
    ],
  };

  if (options.type === "vssue")
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.plugins!.push(["@vssue/vuepress-plugin-vssue", options]);

  return config;
};
