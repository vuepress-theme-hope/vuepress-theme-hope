import { Component, Prop, Vue } from "vue-property-decorator";
import TagIcon from "./icons/TagIcon.vue";
import { capitalize } from "@mr-hope/vuepress-shared";
import { pageInfoI18n } from "./define";

@Component({ components: { TagIcon } })
export default class TagInfo extends Vue {
  @Prop({ type: Array, default: () => [] })
  private readonly tags!: string[];

  private get $tags(): string[] {
    if (this.tags.length !== 0) return this.tags;

    const { tags, tag = tags } = this.$frontmatter;

    if (typeof tag === "string") return [capitalize(tag)];

    if (Array.isArray(tag)) return tag.map((item) => capitalize(item));

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
    return pageInfoI18n[this.$localePath || "/"].tag;
  }
}
