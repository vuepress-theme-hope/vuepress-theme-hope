import { h } from "vue";

import type { FunctionalComponent, VNode } from "vue";

export interface CodeGroupItemProps {
  title: string;
  active?: boolean;
}

const CodeGroupItem: FunctionalComponent<CodeGroupItemProps> = (
  { active = false },
  { slots }
): VNode =>
  h(
    "div",
    {
      class: ["code-group-item", { active }],
      "aria-selected": active,
    },
    slots.default?.()
  );

CodeGroupItem.displayName = "CodeGroupItem";

export default CodeGroupItem;
