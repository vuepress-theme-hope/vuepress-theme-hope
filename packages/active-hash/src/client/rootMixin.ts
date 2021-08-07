import debounce from "lodash.debounce";
import Vue from "vue";

let scrollHandler: () => void;

export default Vue.extend({
  mounted() {
    scrollHandler = debounce(() => {
      this.setActiveHash();
    }, 300);

    window.addEventListener("scroll", scrollHandler);
  },

  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy() {
    window.removeEventListener("scroll", scrollHandler);
  },

  methods: {
    setActiveHash(): void {
      const activeLinks = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
          ACTIVE_HASH_ACTIVE_SELECTOR
        )
      );

      const anchors = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
          ACTIVE_HASH_HEADER_SELECTOR
        )
      ).filter(
        (anchor) =>
          activeLinks.length === 0 ||
          activeLinks.some((activeLink) => activeLink.hash === anchor.hash)
      );

      const themeContentScrollTop =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector<HTMLElement>(
          ACTIVE_HASH_CONTAINER_SELECTOR
        )!.offsetTop;

      const scrollTop = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );

      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      const bottomY = window.innerHeight + scrollTop;

      const routeHash = decodeURIComponent(this.$route.hash);

      const updateHash = (hash: string, index: number): void => {
        // check if anchor is at the bottom of the page to keep $route.hash consistent
        if (bottomY === scrollHeight)
          for (let j = index + 1; j < anchors.length; j++)
            if (routeHash === decodeURIComponent(anchors[j].hash)) return;

        this.$vuepress.$set("disableScrollBehavior", true);
        this.$router.replace(decodeURIComponent(hash), () => {
          // execute after scrollBehavior handler.
          this.$nextTick(() => {
            this.$vuepress.$set("disableScrollBehavior", false);
          });
        });
      };

      // try to remove hash
      if (scrollTop - themeContentScrollTop < 0 && routeHash) {
        updateHash("#", -1);
        return;
      }

      // check headers
      for (let index = 0; index < anchors.length; index++) {
        const anchor = anchors[index];
        const nextAnchor = anchors[index + 1];

        const isActive =
          scrollTop - themeContentScrollTop >=
            (anchor.parentElement as HTMLHeadingElement).offsetTop +
              ACTIVE_HASH_OFFSET &&
          (!nextAnchor ||
            scrollTop - themeContentScrollTop <
              (nextAnchor.parentElement as HTMLHeadingElement).offsetTop +
                ACTIVE_HASH_OFFSET);

        if (isActive && routeHash !== decodeURIComponent(anchor.hash)) {
          updateHash(anchor.hash, index);
          return;
        }
      }
    },
  },
});
