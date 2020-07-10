import { PageComputed, PageFrontmatter } from "@mr-hope/vuepress-types";
import * as dayjs from "dayjs";

/** 处理日期 */
export const getDate = (dateString: string): (number | undefined)[] => {
  const time = dayjs(dateString.trim());

  if (time.isValid()) {
    const year = time.year();
    const month = time.month() + 1;
    const date = time.date();
    const hour = time.hour();
    const minute = time.minute();
    const second = time.second();
    const millisecond = time.millisecond();

    if (
      (hour === 8 || hour === 0) &&
      minute === 0 &&
      second === 0 &&
      millisecond === 0
    )
      return [year, month, date, undefined, undefined, undefined];

    return [year, month, date, hour, minute, second];
  }

  const pattern = /(?:(\d+)[/-](\d+)[/-](\d+))?\s*(?:(\d+):(\d+)(?::(\d+))?)?/u;
  const [, year, month, day, hour, minute, second] =
    pattern.exec(dateString.trim()) || [];

  const getNumber = (a: string): number | undefined =>
    typeof a === "undefined" ? undefined : Number(a);

  const getYear = (yearNumber: number | undefined): number | undefined =>
    yearNumber && yearNumber < 100 ? yearNumber + 2000 : yearNumber;

  const getSecond = (secondNumber: number | undefined): number | undefined =>
    hour && minute && !second ? 0 : secondNumber;

  return [
    getYear(getNumber(year)),
    getNumber(month),
    getNumber(day),
    getNumber(hour),
    getNumber(minute),
    getSecond(getNumber(second)),
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
  if (!dataA) return 1;
  if (!dataB) return -1;

  const compare = (
    a: (number | undefined)[],
    b: (number | undefined)[]
  ): number => {
    if (a.length === 0) return 0;
    if (typeof b[0] === "undefined")
      return typeof a[0] === "undefined" || a[0] === 0 ? 0 : -1;
    if (typeof a[0] === "undefined") return b[0] === 0 ? 0 : 1;

    if (b[0] - a[0] === 0) {
      a.shift();
      b.shift();

      return compare(a, b);
    }
    return b[0] - a[0];
  };

  return compare(getDate(dataA), getDate(dataB));
};

/**
 * 过滤文章
 *
 * @param pages 页面
 * @param filterFunc 额外的过滤函数
 */
export const filterArticle = (
  pages: PageComputed[],
  filterFunc?: (frontmatter: PageFrontmatter) => boolean
): PageComputed[] =>
  pages.filter((page) => {
    const {
      frontmatter: { article, blogpage, home },
      title,
    } = page;

    return (
      typeof title !== "undefined" &&
      blogpage !== true &&
      home !== true &&
      article !== false &&
      (!filterFunc || filterFunc(page.frontmatter))
    );
  });

/** 排序文章 */
export const sortArticle = (pages: PageComputed[]): PageComputed[] =>
  pages.slice(0).sort((prev, next) => {
    const prevSticky = prev.frontmatter.sticky as number | boolean | undefined;
    const nextSticky = next.frontmatter.sticky as number | boolean | undefined;
    const prevTime =
      (prev.frontmatter.time as string | undefined) ||
      (prev.frontmatter.date as string | undefined);
    const nextTime =
      (next.frontmatter.time as string | undefined) ||
      (next.frontmatter.date as string | undefined);

    if (prevSticky && nextSticky)
      return prevSticky === nextSticky
        ? compareDate(prevTime, nextTime)
        : Number(nextSticky) - Number(prevSticky);
    if (prevSticky && !nextSticky) return -1;
    if (!prevSticky && nextSticky) return 1;

    return compareDate(prevTime, nextTime);
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
