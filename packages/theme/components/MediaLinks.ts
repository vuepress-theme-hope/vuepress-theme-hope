import { Component, Vue } from "vue-property-decorator";
import Baidu from "@mr-hope/vuepress-shared-utils/icons/media/Baidu.vue";
import Bitbucket from "@mr-hope/vuepress-shared-utils/icons/media/Bitbucket.vue";
import Dingding from "@mr-hope/vuepress-shared-utils/icons/media/Dingding.vue";
import Discord from "@mr-hope/vuepress-shared-utils/icons/media/Discord.vue";
import Dribbble from "@mr-hope/vuepress-shared-utils/icons/media/Dribbble.vue";
import Evernote from "@mr-hope/vuepress-shared-utils/icons/media/Evernote.vue";
import Facebook from "@mr-hope/vuepress-shared-utils/icons/media/Facebook.vue";
import Flipboard from "@mr-hope/vuepress-shared-utils/icons/media/Flipboard.vue";
import Gitee from "@mr-hope/vuepress-shared-utils/icons/media/Gitee.vue";
import Github from "@mr-hope/vuepress-shared-utils/icons/media/Github.vue";
import Gitlab from "@mr-hope/vuepress-shared-utils/icons/media/Gitlab.vue";
import Gmail from "@mr-hope/vuepress-shared-utils/icons/media/Gmail.vue";
import Instagram from "@mr-hope/vuepress-shared-utils/icons/media/Instagram.vue";
import Lines from "@mr-hope/vuepress-shared-utils/icons/media/Lines.vue";
import Linkedin from "@mr-hope/vuepress-shared-utils/icons/media/Linkedin.vue";
import Pinterest from "@mr-hope/vuepress-shared-utils/icons/media/Pinterest.vue";
import Pocket from "@mr-hope/vuepress-shared-utils/icons/media/Pocket.vue";
import QQ from "@mr-hope/vuepress-shared-utils/icons/media/QQ.vue";
import Qzone from "@mr-hope/vuepress-shared-utils/icons/media/Qzone.vue";
import Reddit from "@mr-hope/vuepress-shared-utils/icons/media/Reddit.vue";
import Rss from "@mr-hope/vuepress-shared-utils/icons/media/Rss.vue";
import Steam from "@mr-hope/vuepress-shared-utils/icons/media/Steam.vue";
import Twitter from "@mr-hope/vuepress-shared-utils/icons/media/Twitter.vue";
import Wechat from "@mr-hope/vuepress-shared-utils/icons/media/Wechat.vue";
import Weibo from "@mr-hope/vuepress-shared-utils/icons/media/Weibo.vue";
import Whatsapp from "@mr-hope/vuepress-shared-utils/icons/media/Whatsapp.vue";
import Youtube from "@mr-hope/vuepress-shared-utils/icons/media/Youtube.vue";
import Zhihu from "@mr-hope/vuepress-shared-utils/icons/media/Zhihu.vue";
import { BlogMedia } from "@theme/types";

const medias: BlogMedia[] = [
  "Baidu",
  "Bitbucket",
  "Dingding",
  "Discord",
  "Dribbble",
  "Evernote",
  "Facebook",
  "Flipboard",
  "Gitee",
  "Github",
  "Gitlab",
  "Gmail",
  "Instagram",
  "Lines",
  "Linkedin",
  "Pinterest",
  "Pocket",
  "QQ",
  "Qzone",
  "Reddit",
  "Rss",
  "Steam",
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
    Bitbucket,
    Dingding,
    Discord,
    Dribbble,
    Evernote,
    Facebook,
    Flipboard,
    Gitee,
    Github,
    Gitlab,
    Gmail,
    Instagram,
    Lines,
    Linkedin,
    Pinterest,
    Pocket,
    QQ,
    Qzone,
    Reddit,
    Rss,
    Steam,
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
