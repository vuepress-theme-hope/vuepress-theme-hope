import { isDef } from "@vuepress/helper/client";

// Copied from https://github.com/vuejs/router/blob/941b2131e80550009e5221d4db9f366b1fea3fd5/packages/router/src/RouterLink.ts#L293
export const guardEvent = (event: MouseEvent): boolean | void => {
  // Don't redirect with control keys
  if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;
  // Don't redirect when preventDefault called
  if (event.defaultPrevented) return;
  // Don't redirect on right click
  if (isDef(event.button) && event.button !== 0) return;
  // Don't redirect if `target="_blank"`
  if (event.currentTarget) {
    const target = (<HTMLElement>event.currentTarget).getAttribute("target");

    if (target?.match(/\b_blank\b/iu)) return;
  }

  event.preventDefault();

  return true;
};
