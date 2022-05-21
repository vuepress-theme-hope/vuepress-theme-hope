import { tabs } from "./tabs";

import type { PluginSimple } from "markdown-it";
export const codeTabs: PluginSimple = (md) => {
  tabs(md, {
    name: "code-tabs",
    component: "CodeTabs",
    getter: (tokens, index, options, env, self) => {
      let inCodeTab = false;
      let foundFence = false;
      const codeTabsData: { content: string }[] = [];

      for (let i = index; i < tokens.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { block, type } = tokens[i];

        if (block) {
          if (type === "code-tabs_tabs_close") {
            break;
          }

          if (type === "tab_close") {
            inCodeTab = false;
            continue;
          }

          if (type === "tab_open") {
            // found a code tab
            inCodeTab = true;
            foundFence = false;
            continue;
          }

          if (inCodeTab && type === "fence" && !foundFence) {
            foundFence = true;
            codeTabsData.push({
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              content: self.rules.fence!(tokens, i, options, env, self),
            });
          }
        }
      }

      return codeTabsData;
    },
  });
};
