import { Component, Vue } from 'vue-property-decorator';
import { PageComputed } from 'vuepress-types';
import { deepAssign } from '@mr-hope/vuepress-shared-utils';

/** 处理日期 */
export const getDate = (date: string): (number | undefined)[] => {
  const pattern = /\s*(?:(\d+)[/-](\d+)[/-](\d+))?\s*(?:(\d+):(\d+)(?::(\d+))?)?\s*/u;
  const [, year, month, day, hour, minute, second] = pattern.exec(date) || [];

  const getNumber = (x: string): number | undefined =>
    typeof x === 'undefined' ? undefined : Number(x);

  return [
    getNumber(year),
    getNumber(month),
    getNumber(day),
    getNumber(hour),
    getNumber(minute),
    getNumber(second)
  ];
};

/**
 * 日期比较
 * @param dateA 比较的日期A
 * @param dateB 比较的日期B
 */
export const compareDate = (
  dataA: string | undefined,
  dataB: string | undefined
): number => {
  if (!dataA) return -1;
  if (!dataB) return 1;

  const compare = (
    x: (number | undefined)[],
    y: (number | undefined)[],
    index = 0
  ): number => {
    if (index === 5) return 0;
    if (typeof y[0] === 'undefined') return -1;
    if (typeof x[0] === 'undefined') return 1;

    if (y[0] - x[0] === 0) return compare(x, y, index + 1);

    return y[0] - x[0];
  };

  return compare(getDate(dataA), getDate(dataB));
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
        ? compareDate(prev.frontmatter.date, next.frontmatter.date)
        : prevSticky - nextSticky;
    if (prevSticky && !nextSticky) return -1;
    if (!prevSticky && nextSticky) return 1;

    return compareDate(prev.frontmatter.date, next.frontmatter.date);
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
