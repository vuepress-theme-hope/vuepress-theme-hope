import Vue from "vue";
import type { VNode } from "vue";

interface CodeTab {
  title: string;
  element: HTMLElement | undefined;
}

export default Vue.extend({
  name: "CodeGroup",

  data() {
    return {
      codeTabs: [] as CodeTab[],
      activeTabIndex: -1,
    };
  },

  watch: {
    activeTabIndex(index: number): void {
      this.activateCodeTab(index);
    },
  },

  mounted() {
    this.loadTabs();
  },

  methods: {
    loadTabs(): void {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.codeTabs = ((this.$slots.default as VNode[]) || [])
        .filter((slot) => Boolean(slot.componentOptions))
        .map((slot, index) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const propsData = slot.componentOptions!.propsData as unknown as {
            title: string;
            active?: string | boolean;
          };

          if (propsData.active) this.activeTabIndex = index;

          return {
            title: propsData.title,
            element: slot.elm as HTMLElement | undefined,
          };
        });

      if (this.activeTabIndex === -1 && this.codeTabs.length > 0) {
        this.activeTabIndex = 0;
      }

      this.activateCodeTab(0);
    },

    changeCodeTab(index: number): void {
      this.activeTabIndex = index;
    },

    keyDownHandler(event: KeyboardEvent, index: number): void {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        this.activeTabIndex = index;
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        if (index + 1 < this.codeTabs.length) {
          this.activeTabIndex = index + 1;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (this.$refs.tab as HTMLUListElement[])[index + 1].focus();
        }
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (index - 1 >= 0) {
          this.activeTabIndex = index - 1;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (this.$refs.tab as HTMLUListElement[])[index - 1].focus();
        }
      }
    },

    activateCodeTab(activeIndex: number): void {
      this.codeTabs.forEach((codeTab, index) => {
        const { element } = codeTab;

        if (element)
          if (activeIndex === index) element.classList.add("active");
          else element.classList.remove("active");
      });
    },
  },
});
