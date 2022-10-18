import type { App, Page, PageFrontmatter } from "@vuepress/core";
import type {
  PageContent,
  PageIndex,
  SearchPageFrontmatter,
} from "../shared/index.js";
import { Parser } from "htmlparser2";

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSearchProIndex)
    __VUE_HMR_RUNTIME__.updateSearchProIndex(searchIndex)
}

if (import.meta.hot) {
  import.meta.hot.accept(({ searchIndex }) => {
    __VUE_HMR_RUNTIME__.updateSearchProIndex(searchIndex);
  })
}
`;

// TODO: Support category and tag getter
const extractInfo = (frontmatter: PageFrontmatter): SearchPageFrontmatter => ({
  category:
    typeof frontmatter["category"] === "undefined"
      ? []
      : (frontmatter["category"] as string[]),
  tag:
    typeof frontmatter["tag"] === "undefined"
      ? []
      : (frontmatter["tag"] as string[]),
});

// eslint-disable-next-line require-jsdoc
const extractContent = (page: Page): PageContent[] => {
  const indexs: PageContent[] = [];

  const slugs = new Map<string, string>();
  const headers = [...page.headers];
  while (headers.length) {
    const h = headers.shift()!;
    slugs.set(h.slug, h.title);

    headers.push(...h.children);
  }

  let ignoreElement = 0;
  let withinHeader = 0;

  let scope: PageContent = {
    header: "",
    slug: "",
    content: "",
  };
  indexs.push(scope);

  const parser = new Parser({
    ontext(text) {
      if (ignoreElement) return;

      const prop = withinHeader ? "header" : "content";
      scope[prop] += text;
    },

    onopentag(name, attribute) {
      if (
        ignoreElement ||
        name === "script" ||
        name === "style" ||
        (name === "div" && attribute.class === "line-numbers")
      ) {
        ignoreElement += 1;

        return;
      }

      if (withinHeader) {
        withinHeader += 1;

        return;
      }

      if (!/^h\d$/u.test(name)) return;

      const id = attribute.id;
      const title = slugs.get(id);

      if (title) {
        scope = {
          header: title,
          slug: id,
          content: "",
        };
        indexs.push(scope);
        ignoreElement += 1;
      } else {
        scope = {
          header: "",
          slug: id,
          content: "",
        };
        indexs.push(scope);
        withinHeader += 1;
      }
    },
    onclosetag() {
      if (ignoreElement) {
        ignoreElement -= 1;

        return;
      }

      if (withinHeader) withinHeader -= 1;
    },
  });

  parser.parseComplete(page.contentRendered);

  return indexs
    .map((index) => {
      index.header = index.header
        .replace(/\s{2,}/g, " ")
        .replace(/^#/g, "")
        .trim();
      index.content = index.content.replace(/\s{2,}/g, " ").trim();

      return index;
    })
    .filter((p) => p.content || p.header);
};

export const prepareSearchIndex = async ({
  env,
  pages,
  writeTemp,
}: App): Promise<void> => {
  const searchIndex = pages.map(
    (page): PageIndex => ({
      path: page.path,
      title: page.title,
      pathLocale: page.pathLocale,
      frontmatter: extractInfo(page.frontmatter),
      contents: extractContent(page),
    })
  );

  // search index file content
  let content = `
export const searchIndex = ${JSON.stringify(searchIndex, null, 2)}
`;

  // inject HMR code
  if (env.isDev) content += HMR_CODE;

  await writeTemp("internal/search-pro/index.js", content);
};
