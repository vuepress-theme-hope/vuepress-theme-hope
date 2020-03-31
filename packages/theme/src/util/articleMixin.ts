import { Component, Vue } from 'vue-property-decorator';
import { PageComputed } from 'vuepress-types';
import { deepAssign } from '@mr-hope/vuepress-shared-utils';

/**
 * 日期比较
 * @param pageA 比较的页面1
 * @param pageB 比较的页面2
 */
const compareDate = (pageA: PageComputed, pageB: PageComputed): number => {
  if (!pageA.frontmatter.date) return -1;
  if (!pageB.frontmatter.date) return 1;

  return (
    new Date(pageB.frontmatter.date).getTime() -
    new Date(pageA.frontmatter.date).getTime()
  );
};

/**
 * 过滤文章
 *
 * @param pages 页面
 * @param isTimeline 是否是时间线
 */
const filterArticle = (
  pages: PageComputed[],
  isTimeline?: boolean
): PageComputed[] =>
  pages.filter((page) => {
    const {
      frontmatter: { article, blogpage, home, date },
      title
    } = page;

    return (
      typeof title !== 'undefined' &&
      blogpage !== true &&
      home !== true &&
      article !== false &&
      // 时间线处理
      (isTimeline !== true || date !== undefined)
    );
  });

/**
 * 排序文章
 *
 * @param pages
 */
const sortArticle = (pages: PageComputed[]): PageComputed[] =>
  pages.sort((prev, next) => {
    const prevSticky = prev.frontmatter.sticky;
    const nextSticky = next.frontmatter.sticky;

    if (prevSticky && nextSticky)
      return prevSticky === nextSticky
        ? compareDate(prev, next)
        : prevSticky - nextSticky;
    if (prevSticky && !nextSticky) return -1;
    if (!prevSticky && nextSticky) return 1;

    return compareDate(prev, next);
  });

const generatePagination = (
  pages: PageComputed[],
  perPage = 10
): PageComputed[][] => {
  const result: PageComputed[][] = [];
  let index = 0;

  while (index < pages.length) {
    const paginationPage: PageComputed[] = [];
    for (let i = 0; i < perPage; i++)
      if (index < pages.length) {
        paginationPage.push(pages[index]);
        index += 1;
      }

    result.push(paginationPage);
  }

  return result;
};

@Component
export default class ArticleMixin extends Vue {
  /** 文章列表 */
  protected get $articles(): PageComputed[] {
    const { pages } = this.$site;

    // 先过滤再排序
    return sortArticle(
      filterArticle(pages.map((page) => deepAssign({}, page) as PageComputed))
    );
  }

  /** 文章分页 */
  protected get $paginationArticles(): PageComputed[][] {
    return generatePagination(this.$articles);
  }
}
