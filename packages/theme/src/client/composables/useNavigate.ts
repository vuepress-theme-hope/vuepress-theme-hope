import { isLinkAbsolute, isLinkWithProtocol } from "@vuepress/helper/client";
import { useRoute, useRouter } from "vuepress/client";

const FAKE_HOST = "http://.";

export const useNavigate = (): ((url: string) => void) => {
  const router = useRouter();
  const route = useRoute();

  return (url) => {
    if (!url) return;

    // Outer url
    if (isLinkWithProtocol(url)) {
      return window.open(url);
    }

    // Inner absolute path
    if (isLinkAbsolute(url)) {
      if (route.fullPath === url) return;

      return void router.push(url);
    }

    // Inner relative path
    const loc = route.path.slice(0, route.path.lastIndexOf("/"));

    return void router.push(
      new URL(`${loc}/${encodeURI(url)}`, FAKE_HOST).pathname,
    );
  };
};
