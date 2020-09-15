import { Component, Vue } from "vue-property-decorator";
import { endingSlashRE, outboundRE } from "@theme/util/path";

@Component
export default class PageEdit extends Vue {
  private get lastUpdated(): string {
    return this.$themeConfig.lastUpdated === false
      ? ""
      : this.$page.lastUpdated || "";
  }

  private get lastUpdatedText(): string {
    return this.$themeLocaleConfig.lastUpdated || "Last Updated";
  }

  private get editLink(): string | false {
    /** 是否展示编辑此页链接 */
    const showEditLink =
      (this.$page.frontmatter.editLink as boolean | undefined) ||
      (this.$themeConfig.editLinks !== false &&
        this.$page.frontmatter.editLink !== false);

    const { repo, docsRepo } = this.$site.themeConfig;

    if (showEditLink && (repo || docsRepo) && this.$page.relativePath)
      return this.createEditLink();

    return false;
  }

  private get editLinkText(): string {
    return this.$themeLocaleConfig.editLinkText || "Edit this page";
  }

  private createEditLink(): string {
    const {
      repo = "",
      docsRepo = repo,
      docsDir = "",
      docsBranch = "master",
    } = this.$themeConfig;

    const bitbucket = /bitbucket.org/u;

    if (bitbucket.test(docsRepo))
      return `${docsRepo.replace(endingSlashRE, "")}/src/${docsBranch}/${
        docsDir ? `${docsDir.replace(endingSlashRE, "")}/` : ""
      }${
        this.$page.relativePath
      }?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`;

    const gitlab = /gitlab.com/u;
    if (gitlab.test(docsRepo))
      return `${docsRepo.replace(endingSlashRE, "")}/-/edit/${docsBranch}/${
        docsDir ? `${docsDir.replace(endingSlashRE, "")}/` : ""
      }${this.$page.relativePath}`;

    const base = outboundRE.test(docsRepo)
      ? docsRepo
      : `https://github.com/${docsRepo}`;

    return `${base.replace(endingSlashRE, "")}/edit/${docsBranch}/${
      docsDir ? `${docsDir.replace(endingSlashRE, "")}/` : ""
    }${this.$page.relativePath}`;
  }
}
