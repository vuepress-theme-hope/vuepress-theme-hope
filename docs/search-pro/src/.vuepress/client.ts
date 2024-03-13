import SocialLink from "docs-shared/components/SocialLink.js";
import { defineClientConfig } from "vuepress/client";
import { defineSearchConfig } from "vuepress-plugin-search-pro/client";

import "vuepress-theme-hope/presets/shinning-feature-panel.scss";

interface APIResult {
  code: number;
  msg: string;
  result: {
    list: {
      word: string;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      word_tag: string;
      index: string;
    }[];
  };
}

defineSearchConfig({
  locales: {
    "/zh/": {
      splitWord: (query: string) =>
        query
          ? fetch(
              `https://apis.tianapi.com/nlpwords/index?key=a4db17885c693a18495690cc7118b510&content=${query}`,
            )
              .then((res) => res.json() as Promise<APIResult>)
              .then(({ result }) =>
                result.list
                  .map(
                    (_, index, list) =>
                      list.find((item) => item.index === index.toString())!
                        .word,
                  )
                  .filter((word) => word.trim()),
              )
          : Promise.resolve([]),
    },
  },
});

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("SocialLink", SocialLink);
  },
});
