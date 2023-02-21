import { type App, type Page } from "@vuepress/core";
import { isArray } from "@vuepress/shared";
import { type AnyNode, load } from "cheerio";
import { fromEntries, keys } from "vuepress-shared/node";

import {
  type SearchProCustomFieldOptions,
  type SearchProOptions,
} from "./options.js";
import {
  type PageHeaderContent,
  type PageIndex,
  type SearchIndex,
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
  "header,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,li,main,ol,p,ul,caption,table,thead,tbody,th,tr,td,datalist,fieldset,form,legend,optgroup,option,select,details,dialog,menu,menuitem,summary,blockquote,tfoot".split(
    ","
  );

/**
 * @description Not all the inline tags are included, because some of them shall not be indexed, e.g.: pre
 *
 * routerlink is added to the list, because it is a special link tag
 */
const CONTENT_INLINE_TAGS =
  "routerlink,a,b,abbr,bdi,bdo,cite,code,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,del,ins,button,label,legend,meter,optgroup,option,output,progress,select".split(
    ","
  );

const $ = load("");

export const generatePageIndex = (
  page: Page<{ excerpt?: string }>,
  customFieldsGetter: SearchProCustomFieldOptions[] = [],
  indexContent = false
): PageIndex | null => {
  const hasExcerpt = "excerpt" in page.data && page.data["excerpt"].length;

  const result: PageIndex = {
    title: page.title,
    contents: [],
  };

  // here are some variables holding the current state of the parser
  let shouldIndexContent = hasExcerpt || indexContent;
  let currentContent = "";
  let currentHeaderContent: PageHeaderContent = {
    header: "",
    slug: "",
    contents: [],
  };
  let isContentBeforeFirstHeader = true;

  const render = (node: AnyNode): void => {
    if (node.type === "tag") {
      if (HEADING_TAGS.includes(node.name)) {
        if (currentContent && shouldIndexContent) {
          // add last content
          currentHeaderContent?.contents.push(
            currentContent.replace(/\s+/gu, " ")
          );
          currentContent = "";
        }

        // content before first header does not belong to any header
        if (isContentBeforeFirstHeader) {
          // the content before the first header shall have actual contents
          if (currentHeaderContent.contents.length)
            result.contents.push(currentHeaderContent);

          isContentBeforeFirstHeader = false;
        } else {
          result.contents.push(currentHeaderContent);
        }

        // update header
        currentHeaderContent = {
          header: node.children
            .map((node) => (node.type === "text" ? node.data : ""))
            .join("")
            .trim(),
          slug: node.attribs["id"],
          contents: [],
        };
      } else if (CONTENT_BLOCK_TAGS.includes(node.name)) {
        if (currentContent && shouldIndexContent) {
          // add last content
          currentHeaderContent?.contents.push(
            currentContent.replace(/\s+/gu, " ")
          );
          currentContent = "";
        }
        node.childNodes.forEach(render);
      } else if (CONTENT_INLINE_TAGS.includes(node.name)) {
        node.childNodes.forEach(render);
      }
    } else if (node.type === "text") {
      currentContent += node.data.trim() ? node.data : "";
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

  const nodes = $.parseHTML(page.contentRendered);

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
      .filter((item): item is [string, string[]] => item !== null)
  );

  // no content in page and no customFields
  if (!nodes?.length && !keys(customFields).length) return null;

  // walk through nodes and extract indexes
  nodes?.forEach((node) => {
    render(node);
  });

  // push contents in last block tags
  if (shouldIndexContent && currentContent)
    currentHeaderContent?.contents.push(currentContent);

  // push last content
  if (currentHeaderContent.contents.length)
    result.contents.push(currentHeaderContent);

  return {
    ...result,
    ...(keys(customFields).length ? { customFields } : {}),
  };
};

export const getSearchIndex = (
  app: App,
  options: SearchProOptions
): SearchIndex => {
  const pagesSearchIndex = app.pages
    .map((page) => {
      const pageIndex = generatePageIndex(
        page,
        options.customFields,
        options.indexContent
      );

      return pageIndex
        ? { path: page.path, index: pageIndex, localePath: page.pathLocale }
        : null;
    })
    .filter(
      (item): item is { path: string; index: PageIndex; localePath: string } =>
        item !== null
    );

  return fromEntries(
    keys(
      // locales should at least have root locales
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { "/": {}, ...app.options.locales }
    ).map((localePath) => [
      localePath,
      fromEntries(
        pagesSearchIndex
          .filter((item) => item.localePath === localePath)
          .map((item) => [item.path, item.index])
      ),
    ])
  );
};
