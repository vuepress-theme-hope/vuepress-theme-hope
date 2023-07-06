import type { App, Page } from "@vuepress/core";
import type { AnyNode, Element } from "cheerio";
import { load } from "cheerio";
import { addAllAsync, createIndex } from "slimsearch";
import { entries, fromEntries, isArray, keys } from "vuepress-shared/node";

import type {
  SearchProCustomFieldOptions,
  SearchProOptions,
} from "./options.js";
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

const $ = load("");

const renderHeader = (node: Element): string =>
  node.children
    .map((node) => {
      if (node.type === "tag") {
        // drop anchor
        if (node.name === "a" && node.attribs["class"] === "header-anchor")
          return "";

        return renderHeader(node);
      }

      if (node.type === "text") return node.data;

      return "";
    })
    .join(" ")
    .replace(/\s+/gu, " ")
    .trim();

export const generatePageIndex = (
  page: Page<{ excerpt?: string }>,
  customFieldsGetter: SearchProCustomFieldOptions[] = [],
  indexContent = false,
): IndexItem[] => {
  const { contentRendered, data, title } = page;
  const key = <PageIndexId>page.key;
  const hasExcerpt = "excerpt" in data && data["excerpt"].length;

  const pageIndex: PageIndexItem = { id: key, h: title };
  const results: IndexItem[] = [pageIndex];

  // here are some variables holding the current state of the parser
  let shouldIndexContent = hasExcerpt || indexContent;
  let currentSectionIndex: PageIndexItem | SectionIndexItem | null = null;
  let currentContent = "";
  let isContentBeforeFirstHeader = true;

  const render = (node: AnyNode, preserveSpace = false): void => {
    if (node.type === "tag") {
      if (HEADING_TAGS.includes(node.name)) {
        const id = node.attribs["id"];
        const header = renderHeader(node);

        if (currentContent && shouldIndexContent) {
          // add last content
          // add last content
          ((isContentBeforeFirstHeader ? pageIndex : currentSectionIndex!).t ??=
            []).push(currentContent.replace(/\s+/gu, " "));
          currentContent = "";
        }

        // update current section index only if it has an id
        if (id) {
          if (isContentBeforeFirstHeader) isContentBeforeFirstHeader = false;
          else results.push(currentSectionIndex!);

          currentSectionIndex = {
            id: `${key}#${id}`,
            h: header,
          };
        } else if (header) {
          ((currentSectionIndex ?? pageIndex).t ??= []).push(header);
        }
      } else if (CONTENT_BLOCK_TAGS.includes(node.name)) {
        if (currentContent && shouldIndexContent) {
          // add last content
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
      // we are expecting to stop at excerpt marker
      hasExcerpt &&
      !indexContent &&
      // we got excerpt marker
      node.type === "comment" &&
      node.data.trim() === "more"
    ) {
      shouldIndexContent = false;
    }
  };

  const nodes = $.parseHTML(contentRendered);

  // get custom fields
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

  // no content in page and no customFields
  if (!nodes?.length && !keys(customFields).length) return [];

  // walk through nodes and extract indexes
  nodes?.forEach((node) => {
    render(node);
  });

  // push contents in last block tags
  if (shouldIndexContent && currentContent)
    ((isContentBeforeFirstHeader ? pageIndex : currentSectionIndex)!.t ??=
      []).push(currentContent);

  // push last section
  if (currentSectionIndex) results.push(currentSectionIndex);

  // add custom fields
  entries(customFields).forEach(([customField, values]) => {
    results.push({
      id: `${key}@${customField}`,
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
    indexOptions,
    indexLocaleOptions,
  }: SearchProOptions,
): Promise<SearchIndexStore> => {
  const indexesByLocale: LocaleIndex = {};

  app.pages.forEach((page) => {
    const indexes = generatePageIndex(page, customFields, indexContent);

    (indexesByLocale[page.pathLocale] ??= []).push(...indexes);
  });

  const searchIndex: SearchIndexStore = {};

  await Promise.all(
    entries(indexesByLocale).map(async ([localePath, indexes]) => {
      const index = createIndex<IndexItem, string>({
        ...indexOptions,
        ...indexLocaleOptions?.[localePath],
        fields: [/** heading */ "h", /** text */ "t", /** customFields */ "c"],
        storeFields: [
          /** heading */ "h",
          /** anchor */ "a",
          /** text */ "t",
          /** customFields */ "c",
        ],
      });

      await addAllAsync(index, indexes);

      searchIndex[localePath] = index;
    }),
  );

  return searchIndex;
};
