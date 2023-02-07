import { tab } from "@mdit/plugin-tab";
import { type PluginSimple } from "markdown-it";

export const codeTabs: PluginSimple = (md) => {
  tab(md, {
    name: "code-tabs",

    tabsOpenRenderer: ({ active, data }, tokens, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { meta } = tokens[index];
      const tabData = data.map(({ title, id }) => ({
        title,
        ...(id ? { id } : {}),
      }));

      return `<CodeTabs id="${index}" :data='${
        // single quote will break @vue/compiler-sfc
        JSON.stringify(tabData).replace(/'/g, "&#39")
      }'${active !== -1 ? ` :active="${active}"` : ""}${
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        meta.id ? ` tab-id="${meta.id as string}"` : ""
      }>
`;
    },

    tabsCloseRenderer: () => `\
</CodeTabs>
`,

    tabOpenRenderer: ({ index }, tokens, tokenIndex) => {
      let foundFence = false;

      // hide all elements excerpt the first fence
      for (let i = tokenIndex; i < tokens.length; i++) {
        const { block, type } = tokens[i];

        if (block) {
          if (type === "code-tabs_tab_close") break;

          if (type === "fence" && !foundFence) {
            foundFence = true;
            continue;
          }

          tokens[i].type = "code_tab_empty";
          tokens[i].hidden = true;
        }
      }

      return `\
<template #tab${index}="{ title, value, isActive }">
`;
    },

    tabCloseRenderer: () => `\
</template>
`,
  });
};
