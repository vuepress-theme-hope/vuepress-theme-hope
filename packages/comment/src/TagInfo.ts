import { Component, Prop, Vue } from "vue-property-decorator";
import TagIcon from "@mr-hope/vuepress-shared-utils/icons/TagIcon.vue";
import { capitalize } from "@mr-hope/vuepress-shared-utils";

@Component({ components: { TagIcon } })
export default class TagInfo extends Vue {
  @Prop({ type: Array, default: () => [] })
  private readonly tags!: string[];

  private get $tags(): string[] {
    if (this.tags.length !== 0) return this.tags;

    const {
      tag,
      tags = tag as string | string[] | undefined,
    } = this.$frontmatter;

    if (typeof tags === "string") return [capitalize(tags)];

    if (Array.isArray(tags)) return tags.map((item) => capitalize(item));

    return [];
  }

  private get clickable(): boolean {
    return this.$themeConfig.blog !== false;
  }

  private navigate(tagName: string): void {
    const path = `/tag/${tagName}/`;
    if (this.$route.path !== path) void this.$router.push(path);
  }

  private get hint(): string {
    return PAGE_INFO_I18N.tag[this.$localePath || "/"];
  }
}
