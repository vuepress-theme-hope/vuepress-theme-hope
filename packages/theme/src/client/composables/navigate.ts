import { isLinkWithProtocol } from "@vuepress/shared";
import { useRoute, useRouter } from "vue-router";
import { isAbsoluteUrl } from "vuepress-shared/client";

export const useNavigate = (): ((url: string) => void) => {
  const router = useRouter();
  const route = useRoute();

  return (url) => {
    if (url)
      if (isAbsoluteUrl(url)) {
        // Inner absolute path
        if (route.path !== url) void router.push(url);
      } else if (isLinkWithProtocol(url)) {
        // Outer url
        if (window) window.open(url);
      } else {
        // Inner relative path
        const base = route.path.slice(0, route.path.lastIndexOf("/"));

        void router.push(`${base}/${encodeURI(url)}`);
      }
  };
};
