<template>
  <footer class="page-edit">
    <div v-if="editLink" class="edit-link">
      <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
      <OutboundLink />
    </div>

    <div v-if="lastUpdated" class="last-updated">
      <span class="prefix">{{ lastUpdatedText }}:</span>
      <span class="time">{{ lastUpdated }}</span>
    </div>
  </footer>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { endingSlashRE, outboundRE } from "../util/path";

@Component
export default class PageEdit extends Vue {
  private get lastUpdated() {
    return this.$page.lastUpdated;
  }

  private get lastUpdatedText() {
    return this.$themeLocaleConfig.lastUpdated || "Last Updated";
  }

  private get editLink() {
    /** 是否展示编辑此页链接 */
    const showEditLink =
      this.$page.frontmatter.editLink ||
      (this.$themeConfig.editLinks !== false &&
        this.$page.frontmatter.editLink !== false);

    const { repo, docsRepo } = this.$site.themeConfig;

    if (showEditLink && (repo || docsRepo) && this.$page.relativePath)
      return this.createEditLink();

    return false;
  }

  private get editLinkText() {
    return this.$themeLocaleConfig.editLinkText || "Edit this page";
  }

  private createEditLink() {
    const {
      repo = "",
      docsRepo = repo,
      docsDir = "",
      docsBranch = "master",
    } = this.$themeConfig;

    const bitbucket = /bitbucket.org/u;

    if (bitbucket.test(repo)) {
      const base = outboundRE.test(docsRepo) ? docsRepo : repo;

      return `${base.replace(endingSlashRE, "")}/src/${docsBranch}/${
        docsDir ? `${docsDir.replace(endingSlashRE, "")}/` : ""
      }${
        this.$page.relativePath
      }?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`;
    }

    const base = outboundRE.test(docsRepo)
      ? docsRepo
      : `https://github.com/${docsRepo}`;

    return `${base.replace(endingSlashRE, "")}/edit/${docsBranch}/${
      docsDir ? `${docsDir.replace(endingSlashRE, "")}/` : ""
    }${this.$page.relativePath}`;
  }
}
</script>

<style lang="stylus">
@require '~@theme/styles/wrapper.styl'

.page-edit
  @extend $wrapper
  padding-top 12px
  padding-bottom 12px
  overflow auto

  .edit-link
    display inline-block
    font-size 14px

    a
      color var(--accent-color-l10)

  .last-updated
    float right
    font-size 14px

    .prefix
      font-weight 500
      color var(--text-color-l25)

    .time
      font-weight 400
      color var(--dark-grey)

@media (max-width: $MQMobile)
  .page-edit
    .edit-link
      margin-bottom 8px

    .last-updated
      font-size 13px
      float none
      text-align left
</style>
