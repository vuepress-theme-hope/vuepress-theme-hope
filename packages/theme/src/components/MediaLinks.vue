<template>
  <div v-if="mediaLink" class="media-links-wrapper">
    <div
      v-for="link in links"
      :key="link.name"
      class="media-link"
      @click="navigate(link.url,$router,$route)"
    >
      <Component :is="link.icon" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import Baidu from "@mr-hope/vuepress-shared-utils/icons/media/Baidu.vue";
import Dingding from "@mr-hope/vuepress-shared-utils/icons/media/Dingding.vue";
import Dribbble from "@mr-hope/vuepress-shared-utils/icons/media/Dribbble.vue";
import Evernote from "@mr-hope/vuepress-shared-utils/icons/media/Evernote.vue";
import Facebook from "@mr-hope/vuepress-shared-utils/icons/media/Facebook.vue";
import Flipboard from "@mr-hope/vuepress-shared-utils/icons/media/Flipboard.vue";
import Github from "@mr-hope/vuepress-shared-utils/icons/media/Github.vue";
import Gmail from "@mr-hope/vuepress-shared-utils/icons/media/Gmail.vue";
import Instagram from "@mr-hope/vuepress-shared-utils/icons/media/Instagram.vue";
import Lines from "@mr-hope/vuepress-shared-utils/icons/media/Lines.vue";
import Linkedin from "@mr-hope/vuepress-shared-utils/icons/media/Linkedin.vue";
import Pinterest from "@mr-hope/vuepress-shared-utils/icons/media/Pinterest.vue";
import Pocket from "@mr-hope/vuepress-shared-utils/icons/media/Pocket.vue";
import QQ from "@mr-hope/vuepress-shared-utils/icons/media/QQ.vue";
import Qzone from "@mr-hope/vuepress-shared-utils/icons/media/Qzone.vue";
import Rss from "@mr-hope/vuepress-shared-utils/icons/media/Rss.vue";
import Steam from "@mr-hope/vuepress-shared-utils/icons/media/Steam.vue";
import Taobao from "@mr-hope/vuepress-shared-utils/icons/media/Taobao.vue";
import Twitter from "@mr-hope/vuepress-shared-utils/icons/media/Twitter.vue";
import Wechat from "@mr-hope/vuepress-shared-utils/icons/media/Wechat.vue";
import Weibo from "@mr-hope/vuepress-shared-utils/icons/media/Weibo.vue";
import Whatsapp from "@mr-hope/vuepress-shared-utils/icons/media/Whatsapp.vue";
import Youtube from "@mr-hope/vuepress-shared-utils/icons/media/Youtube.vue";
import Zhihu from "@mr-hope/vuepress-shared-utils/icons/media/Zhihu.vue";
import navigate from "../util/navigate";

/** 合法媒体 */
const medias = [
  "Baidu",
  "Dingding",
  "Dribbble",
  "Evernote",
  "Facebook",
  "Flipboard",
  "Github",
  "Gmail",
  "Instagram",
  "Lines",
  "Linkedin",
  "Pinterest",
  "Pocket",
  "QQ",
  "Qzone",
  "Rss",
  "Steam",
  "Taobao",
  "Twitter",
  "Wechat",
  "Weibo",
  "Whatsapp",
  "Youtube",
  "Zhihu",
];

interface MediaLink {
  icon: string;
  url: string;
}

@Component({
  components: {
    Baidu,
    Dingding,
    Dribbble,
    Evernote,
    Facebook,
    Flipboard,
    Github,
    Gmail,
    Instagram,
    Lines,
    Linkedin,
    Pinterest,
    Pocket,
    QQ,
    Qzone,
    Rss,
    Steam,
    Taobao,
    Twitter,
    Wechat,
    Weibo,
    Whatsapp,
    Youtube,
    Zhihu,
  },
})
export default class MediaLinks extends Vue {
  private navigate = navigate;

  private get mediaLink(): Record<string, string> | false {
    const { medialink } = this.$frontmatter;

    return medialink === false
      ? false
      : typeof medialink === "object"
      ? medialink
      : this.$themeConfig.blog
      ? this.$themeConfig.blog.links || false
      : false;
  }

  private get links() {
    if (this.mediaLink) {
      const links: MediaLink[] = [];

      for (const media in this.mediaLink)
        if (medias.includes(media))
          links.push({ icon: media, url: this.mediaLink[media] });

      return links;
    }

    return [];
  }
}
</script>

<style lang="stylus">
.media-links-wrapper
  display flex
  justify-content center
  margin 8px auto

  .media-link
    width 28px
    height 28px
    margin 4px
    transform scale(1, 1)
    transition all 0.2s

    &:hover
      cursor pointer
      transform scale(1.2, 1.2)

    .icon
      width 100%
      height 100%
</style>