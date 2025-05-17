import type { SlotContent } from "@vuepress/helper/client";
import { isArray } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { Comment, Fragment } from "vue";

const isVNodeChildrenEmpty = (children: VNode[]): boolean =>
  children.every((item) => {
    if (item.type === Comment) return true;

    if (item.type === Fragment) {
      return (
        item.children == null ||
        (isArray(item.children) &&
          isVNodeChildrenEmpty(item.children as VNode[]))
      );
    }

    return false;
  });

export const isSlotResultEmpty = (
  normalizedSlotContent: SlotContent,
): boolean => {
  if (normalizedSlotContent == null) return true;

  if (isArray(normalizedSlotContent))
    return isVNodeChildrenEmpty(normalizedSlotContent);

  return false;
};
