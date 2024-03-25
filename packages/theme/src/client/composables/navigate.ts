import { isLinkAbsolute, isLinkWithProtocol } from "@vuepress/helper/client";
import { useRoute, useRouter } from "vuepress/client";

const FAKE_HOST = "http://.";

export const useNavigate = (): ((url: string) => void) => {
  const router = useRouter();
  const route = useRoute();

  return (url) => {
    if (url)
      if (isLinkAbsolute(url)) {
        // Inner absolute path
        if (route.path !== url) void router.push(url);
      } else if (isLinkWithProtocol(url)) {
        // Outer url
        if (window) window.open(url);
      } else {
        // Inner relative path
        const loc = route.path.slice(0, route.path.lastIndexOf("/"));

        void router.push(
          new URL(`${loc}/${encodeURI(url)}`, FAKE_HOST).pathname,
        );
      }
  };
};
