import { CommentOptions } from "../types";
import { PluginOptionAPI } from "@mr-hope/vuepress-types";

export = (options: CommentOptions): PluginOptionAPI => {
  const config: PluginOptionAPI = {
    name: "comment",

    define: () => ({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      COMMENT_OPTIONS: options,
    }),

    plugins: [
      /** Typescript Support */
      ["@mr-hope/reading-time", { wordPerminute: options.wordPerminute }],
      ["typescript"],
    ],
  };

  if (options.type === "vssue")
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.plugins!.push(["@vssue/vuepress-plugin-vssue", options]);

  return config;
};
