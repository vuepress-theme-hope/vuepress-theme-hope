import { LocaleConfig, ThemeConfig } from 'vuepress-types/types/config';
import { PageComputed, PageFrontmatter } from 'vuepress-types/types/page';
import { SiteData } from 'vuepress-types/types/context';

declare module 'vue/types/vue' {
  export interface Vue {
    $category: any;
    $tag: any;
    $currentTag: any;
    $currentCategory: any;
    $pagination: any;

    $description: string;
    $frontmatter: PageFrontmatter;
    $lang: string;
    $localeConfig: LocaleConfig;
    $localePath: string;
    $page: PageComputed;
    $site: SiteData;
    $siteTitle: string;
    $themeConfig: ThemeConfig;
    $themeLocaleConfig: LocaleConfig;
    $title: string;
  }
}
