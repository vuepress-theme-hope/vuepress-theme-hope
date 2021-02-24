import Vue from "vue";

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
    activeTabIndex(index): void {
      this.activateCodeTab(index);
    },
  },

  mounted() {
    this.loadTabs();
  },

  methods: {
    loadTabs(): void {
      this.codeTabs = (this.$slots.default || [])
        .filter((slot) => Boolean(slot.componentOptions))
        .map((slot, index) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const propsData = (slot.componentOptions!.propsData as unknown) as {
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
