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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { endingSlashRE, outboundRE } from '@theme/util/path';

@Component
export default class PageEdit extends Vue {
  private get lastUpdated() {
    return this.$page.lastUpdated;
  }

  private get lastUpdatedText() {
    return (
      this.$themeLocaleConfig.lastUpdated ||
      this.$themeConfig.lastUpdated ||
      'Last Updated'
    );
  }

  private get editLink() {
    /** 是否展示编辑此页链接 */
    const showEditLink = Boolean(
      this.$page.frontmatter.editLink === undefined
        ? this.$themeConfig.editLinks
        : this.$page.frontmatter.editLink
    );

    const { repo, docsRepo } = this.$site.themeConfig;

    if (showEditLink && (repo || docsRepo) && this.$page.relativePath)
      return this.createEditLink();

    return false;
  }

  private get editLinkText() {
    return (
      this.$themeLocaleConfig.editLinkText ||
      this.$site.themeConfig.editLinkText ||
      'Edit this page'
    );
  }

  private createEditLink() {
    const {
      repo,
      docsRepo = repo,
      docsDir = '',
      docsBranch = 'master'
    } = this.$themeConfig;

    const bitbucket = /bitbucket.org/u;

    if (bitbucket.test(repo)) {
      const base = outboundRE.test(docsRepo) ? docsRepo : repo;

      return `${base.replace(endingSlashRE, '')}/src/${docsBranch}/${
        docsDir ? `${docsDir.replace(endingSlashRE, '')}/` : ''
      }${
        this.$page.relativePath
      }?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`;
    }

    const base = outboundRE.test(docsRepo)
      ? docsRepo
      : `https://github.com/${docsRepo}`;

    return `${base.replace(endingSlashRE, '')}/edit/${docsBranch}/${
      docsDir ? `${docsDir.replace(endingSlashRE, '')}/` : ''
    }${this.$page.relativePath}`;
  }
}
</script>

<style lang="stylus">
@require '~@theme/styles/wrapper.styl'

.page-edit
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  overflow auto

  .edit-link
    display inline-block

    a
      color lighten($textColor, 25%)
      margin-right 0.25rem

  .last-updated
    float right
    font-size 0.9em

    .prefix
      font-weight 500
      color lighten($textColor, 25%)

    .time
      font-weight 400
      color #aaa

@media (max-width: $MQMobile)
  .page-edit
    .edit-link
      margin-bottom 0.5rem

    .last-updated
      font-size 0.8em
      float none
      text-align left
</style>
