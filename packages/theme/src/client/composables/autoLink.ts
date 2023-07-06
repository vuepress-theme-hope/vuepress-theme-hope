import { useRouter } from "vue-router";

import type { AutoLinkOptions } from "../../shared/index.js";
import { resolveLinkInfo } from "../utils/index.js";

/**
 * Resolve AutoLink props from string
 *
 * @example
 * - Input: "/README.md"
 * - Output: { text: "Home", link: "/" }
 */
export const useAutoLink = (
  item: string,
  preferFull = false,
): AutoLinkOptions => {
  const router = useRouter();

  return resolveLinkInfo(router, item, preferFull);
};
