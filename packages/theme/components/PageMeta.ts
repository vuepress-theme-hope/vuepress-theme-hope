import Vue from "vue";
import { GitContributor } from "@mr-hope/vuepress-plugin-git";
import EditIcon from "@theme/icons/EditIcon.vue";
import { endingSlashRE, outboundRE } from "@theme/util/path";
import { HopeThemeLocaleConfigItem } from "@mr-hope/vuepress-shared";

export default Vue.extend({
  name: "PageMeta",

  components: { EditIcon },

  computed: {
    i18n(): HopeThemeLocaleConfigItem["meta"] {
      return (
        this.$themeLocaleConfig.meta || {
          contributor: "Contributors",
          editLink: "Edit this page",
          updateTime: "Last Updated",
        }
      );
    },

    contributors(): GitContributor[] {
      return this.$themeConfig.contributor === false
        ? []
        : this.$page.contributors || [];
    },

    contributorsText(): string {
      return this.i18n.contributor;
    },

    updateTime(): string {
      return this.$themeConfig.updateTime === false
        ? ""
        : this.$page.updateTime || "";
    },

    updateTimeText(): string {
      return this.i18n.updateTime;
    },

    editLink(): string | false {
      const showEditLink =
        this.$page.frontmatter.editLink ||
        (this.$themeConfig.editLinks !== false &&
          this.$page.frontmatter.editLink !== false);

      const { repo, docsRepo } = this.$site.themeConfig;

      if (showEditLink && (repo || docsRepo) && this.$page.relativePath)
        return this.createEditLink();

      return false;
    },

    editLinkText(): string {
      return this.i18n.editLink;
    },
  },

  methods: {
    createEditLink(): string {
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
    },
  },
});
