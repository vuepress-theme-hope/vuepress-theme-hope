import { entries, fromEntries, isArray, keys } from "@vuepress/helper";
import type { AnyNode, Element } from "cheerio";
import { load } from "cheerio";
import { addAllAsync, createIndex } from "slimsearch";
import type { App, Page } from "vuepress/core";

import type {
  SearchProCustomFieldOptions,
  SearchProOptions,
} from "./options.js";
import type { Store } from "./utils.js";
import type {
  IndexItem,
  LocaleIndex,
  PageIndexId,
  PageIndexItem,
  SearchIndexStore,
  SectionIndexItem,
} from "../shared/index.js";

/**
 * These tags are valid HTML tags which can contain content.
 */

/**
 * @description h1 is removed because it's the title of the page.
 */
const HEADING_TAGS = "h2,h3,h4,h5,h6".split(",");

/**
 * @description Not all the block tags are included, because some of them shall not be indexed
 */
const CONTENT_BLOCK_TAGS =
  "header,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,li,main,ol,p,ul,caption,table,thead,tbody,tfoot,th,tr,td,datalist,fieldset,form,legend,optgroup,option,select,details,dialog,menu,menuitem,summary,blockquote,pre".split(
    ",",
  );

/**
 * @description Not all the inline tags are included, because some of them shall not be indexed, e.g.: pre
 *
 * routerlink is added to the list, because it is a special link tag
 */
const CONTENT_INLINE_TAGS =
  "routerlink,a,b,abbr,bdi,bdo,cite,code,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,del,ins,button,label,legend,meter,optgroup,option,output,progress,select".split(
    ",",
  );

const isExcerptMarker = (node: AnyNode): boolean =>
  node.type === "comment" && node.data.trim() === "more";

const $ = load("");

const renderHeader = (node: Element): string => {
  if (
    node.children.length === 1 &&
    node.children[0].type === "tag" &&
    node.children[0].tagName === "a" &&
    node.children[0].attribs["class"] === "header-anchor"
  )
    node.children = (<Element>node.children[0].children[0]).children;

  return node.children
    .map((node) => (node.type === "text" ? node.data : null))
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/gu, " ")
    .trim();
};

export const generatePageIndex = (
  page: Page<{ excerpt?: string }>,
  store: Store,
  customFieldsGetter: SearchProCustomFieldOptions[] = [],
  indexContent = false,
): IndexItem[] => {
  const { contentRendered, data, title } = page;
  const pageId = <PageIndexId>store.addItem(page.path).toString();
  const hasExcerpt = "excerpt" in data && data["excerpt"].length;

  const pageIndex: PageIndexItem = { id: pageId, h: title };
  const results: IndexItem[] = [pageIndex];

  // Here are some variables holding the current state of the parser
  let shouldIndexContent = hasExcerpt || indexContent;
  let currentSectionIndex: PageIndexItem | SectionIndexItem | null = null;
  let currentContent = "";
  let isContentBeforeFirstHeader = true;

  const render = (node: AnyNode, preserveSpace = false): void => {
    if (node.type === "tag") {
      if (HEADING_TAGS.includes(node.name)) {
        const { id } = node.attribs;
        const header = renderHeader(node);

        if (currentContent && shouldIndexContent) {
          // Add last content
          ((isContentBeforeFirstHeader ? pageIndex : currentSectionIndex!).t ??=
            []).push(currentContent.replace(/\s+/gu, " "));
          currentContent = "";
        }

        // Update current section index only if it has an id
        if (id) {
          if (isContentBeforeFirstHeader) isContentBeforeFirstHeader = false;
          else results.push(currentSectionIndex!);

          currentSectionIndex = {
            id: `${pageId}#${id}`,
            h: header,
          };
        } else if (header) {
          ((currentSectionIndex ?? pageIndex).t ??= []).push(header);
        }
      } else if (CONTENT_BLOCK_TAGS.includes(node.name)) {
        if (currentContent && shouldIndexContent) {
          // Add last content
          ((isContentBeforeFirstHeader ? pageIndex : currentSectionIndex)!.t ??=
            []).push(currentContent.replace(/\s+/gu, " "));
          currentContent = "";
        }
        node.childNodes.forEach((item) =>
          render(item, preserveSpace || node.name === "pre"),
        );
      } else if (CONTENT_INLINE_TAGS.includes(node.name)) {
        node.childNodes.forEach((item) => render(item, preserveSpace));
      }
    } else if (node.type === "text") {
      currentContent += preserveSpace || node.data.trim() ? node.data : "";
    } else if (
      // We are expecting to stop at excerpt marker if content is not indexed
      hasExcerpt &&
      !indexContent &&
      isExcerptMarker(node)
    ) {
      shouldIndexContent = false;
    }
  };

  const nodes = $.parseHTML(contentRendered);

  // Get custom fields
  const customFields = fromEntries(
    customFieldsGetter
      .map(({ getter }, index) => {
        const result = getter(page);

        return isArray(result)
          ? [index.toString(), result]
          : result
            ? [index.toString(), [result]]
            : null;
      })
      .filter((item): item is [string, string[]] => item !== null),
  );

  // No content in page and no customFields
  if (!nodes?.length && !keys(customFields).length) return [];

  // Walk through nodes and extract indexes
  nodes?.forEach((node) => {
    render(node);
  });

  // Push contents in last block tags
  if (shouldIndexContent && currentContent)
    ((isContentBeforeFirstHeader ? pageIndex : currentSectionIndex)!.t ??=
      []).push(currentContent);

  // Push last section
  if (currentSectionIndex) results.push(currentSectionIndex);

  // Add custom fields
  entries(customFields).forEach(([customField, values]) => {
    results.push({
      id: `${pageId}@${customField}`,
      c: values,
    });
  });

  return results;
};

export const getSearchIndexStore = async (
  app: App,
  {
    customFields,
    indexContent,
    filter = (): boolean => true,
    indexOptions,
    indexLocaleOptions,
  }: SearchProOptions,
  store: Store,
): Promise<SearchIndexStore> => {
  const indexesByLocale: LocaleIndex = {};

  app.pages.forEach((page) => {
    if (filter(page) && page.frontmatter["search"] !== false)
      (indexesByLocale[page.pathLocale] ??= []).push(
        ...generatePageIndex(page, store, customFields, indexContent),
      );
  });

  const searchIndex: SearchIndexStore = {};

  await Promise.all(
    entries(indexesByLocale).map(async ([localePath, indexes]) => {
      const index = createIndex<string, IndexItem, IndexItem>({
        ...indexOptions,
        ...indexLocaleOptions?.[localePath],
        fields: [/** Heading */ "h", /** Text */ "t", /** CustomFields */ "c"],
        storeFields: [
          /** Heading */ "h",
          /** Anchor */ "a",
          /** Text */ "t",
          /** CustomFields */ "c",
        ],
      });

      await addAllAsync(index, indexes);

      searchIndex[localePath] = index;
    }),
  );

  return searchIndex;
};
