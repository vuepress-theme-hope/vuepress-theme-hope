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
import { BlogMedia } from "@theme/types";

/** 合法媒体 */
const medias: BlogMedia[] = [
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
  private get mediaLink(): Partial<Record<BlogMedia, string>> | false {
    const { medialink } = this.$frontmatter;

    return medialink === false
      ? false
      : typeof medialink === "object"
      ? (medialink as Partial<Record<BlogMedia, string>>)
      : this.$themeConfig.blog
      ? this.$themeConfig.blog.links || false
      : false;
  }

  private get links(): MediaLink[] {
    if (this.mediaLink) {
      const links: MediaLink[] = [];

      for (const media in this.mediaLink)
        if (medias.includes(media as BlogMedia))
          links.push({
            icon: media,
            url: this.mediaLink[media as BlogMedia] as string,
          });

      return links;
    }

    return [];
  }
}
