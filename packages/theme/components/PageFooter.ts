import { Component, Vue } from "vue-property-decorator";
import { HopeFooterConfig } from "../types";
import MediaLinks from "@theme/components/MediaLinks.vue";

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { MediaLinks } })
export default class PageFooter extends Vue {
  private get footerConfig(): HopeFooterConfig {
    return this.$themeConfig.footer || {};
  }

  /** 显示页脚 */
  private get display(): boolean {
    const { copyright, footer, medialink } = this.$page.frontmatter;

    return (
      footer !== false &&
      Boolean(copyright || footer || medialink || this.footerConfig.display)
    );
  }

  /** 页脚内容 */
  private get footerContent(): string | false {
    const { footer } = this.$page.frontmatter;

    return footer === false
      ? false
      : typeof footer === "string"
      ? footer
      : this.footerConfig.content || "";
  }

  /** 版权信息 */
  private get copyright(): string | false {
    return this.$frontmatter.copyright === false
      ? false
      : (this.$frontmatter.copyright as string | undefined) ||
          this.footerConfig.copyright ||
          (this.$themeConfig.author
            ? `Copyright © 2020 ${this.$themeConfig.author}`
            : "");
  }
}
