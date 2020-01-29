import { PageComputed } from 'vuepress-types';

/**
 * 日期比较
 * @param pageA 比较的页面1
 * @param pageB 比较的页面2
 */
export const compareDate = (pageA: any, pageB: any): number => {
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
export const filterArticle = (
  pages: PageComputed[],
  isTimeline?: any
): PageComputed[] =>
  pages.filter(page => {
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
export const sortArticle = (pages: PageComputed[]): PageComputed[] => {
  return pages.sort((prev, next) => {
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
};

export const sortArticleByDate = (pages: PageComputed[]): PageComputed[] =>
  pages.sort((prev, next) => {
    return compareDate(prev, next);
  });

export const generatePagination = (
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

/*
 * export default {
 *   computed: {
 *     $recoPostsForTimeline() {
 *       let pages = this.$recoPosts;
 *       const formatPages = {};
 *       const formatPagesArr = [];
 *       pages = filterArticle(pages, true);
 *       this.pages = pages.length === 0 ? [] : pages;
 *       for (let i = 0, { length } = pages; i < length; i++) {
 *         const page = pages[i];
 *         const pageDateYear = dateFormat(page.frontmatter.date, 'year');
 *         if (formatPages[pageDateYear]) formatPages[pageDateYear].push(page);
 *         else formatPages[pageDateYear] = [page];
 *       }
 */

/*
 *       for (const key in formatPages) {
 *         const data = formatPages[key];
 *         sortPostsByDate(data);
 *         formatPagesArr.unshift({
 *           year: key,
 *           data
 *         });
 *       }
 */

/*
 *       return formatPagesArr;
 *     }
 *   }
 * };
 */
