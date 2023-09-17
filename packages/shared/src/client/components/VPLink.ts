import { withBase } from "@vuepress/client";
import type { FunctionalComponent, VNode } from "vue";
import { h } from "vue";
import type { NavigationFailure } from "vue-router";
import { useRouter } from "vue-router";

import { inferRouteLink } from "../../shared/index.js";
import { guardEvent } from "../utils/index.js";

export interface VPLinkProps extends Record<string, unknown> {
  to: string;
}

export const VPLink: FunctionalComponent<
  VPLinkProps,
  Record<never, never>,
  {
    default: () => string | VNode | (string | VNode)[];
  }
> = ({ to = "", class: className = "", ...attrs }, { slots }) => {
  const router = useRouter();
  const navigate = (
    event: MouseEvent = {} as MouseEvent,
  ): Promise<void | NavigationFailure> =>
    guardEvent(event) ? router.push(to).catch() : Promise.resolve();

  return h(
    "a",
    {
      ...attrs,
      class: ["vp-link", className],
      href: withBase(inferRouteLink(to)),
      onClick: navigate,
    },
    slots.default?.(),
  );
};

VPLink.displayName = "VPLink";
