import { Component, Vue } from "vue-property-decorator";
import { HopeFooterConfig } from "../types";
import MediaLinks from "@theme/components/MediaLinks.vue";

@Component({ components: { MediaLinks } })
export default class PageFooter extends Vue {
  private get footerConfig(): HopeFooterConfig {
    return this.$themeConfig.footer || {};
  }

  private get enable(): boolean {
    const { copyrightText, footer, medialink } = this.$page.frontmatter;

    return (
      footer !== false &&
      Boolean(copyrightText || footer || medialink || this.footerConfig.display)
    );
  }

  private get footerContent(): string | false {
    const { footer } = this.$page.frontmatter;

    return footer === false
      ? false
      : typeof footer === "string"
      ? footer
      : this.footerConfig.content || "";
  }

  private get copyright(): string | false {
    return this.$frontmatter.copyrightText === false
      ? false
      : (this.$frontmatter.copyrightText as string | undefined) ||
          this.footerConfig.copyright ||
          (this.$themeConfig.author
            ? `Copyright © 2020 ${this.$themeConfig.author}`
            : "");
  }
}
