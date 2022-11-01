import { useRouter, useRoute } from "vue-router";

export const useNavigate = (): ((url: string) => void) => {
  const router = useRouter();
  const route = useRoute();

  return (url) => {
    if (url) {
      if (url.startsWith("/")) {
        // Inner absolute path
        if (route.path !== url) void router.push(url);
      } else if (
        url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("mailto:")
      ) {
        // Outer url
        if (window) window.open(url);
      } else {
        // Inner relative path
        const base = route.path.slice(0, route.path.lastIndexOf("/"));

        void router.push(`${base}/${encodeURI(url)}`);
      }
    }
  };
};
