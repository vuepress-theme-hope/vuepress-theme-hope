import { load } from "cheerio";

import type { Page } from "@vuepress/core";
import type { AnyNode } from "cheerio";
import type {
  PageHeaderContent,
  PageIndex,
  SearchProCustomFieldOptions,
} from "../shared/index.js";

const HEADING_TAGS = "h1,h2,h3,h4,h5,h6".split(",");

// These tags are valid HTML tags which can contain content.
const CONTENT_BLOCK_TAGS =
  "header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,li,main,ol,p,ul,caption,table,thead,tbody,th,tr,td,datalist,fieldset,form,legend,optgroup,option,select,details,dialog,menu,menuitem,summary,blockquote,tfoot".split(
    ","
  );
const CONTENT_INLINE_TAGS =
  "routerlink,a,b,abbr,bdi,bdo,cite,code,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,del,ins,button,label,legend,meter,optgroup,option,output,progress,select".split(
    ","
  );

const $ = load("");

export const generatePageIndex = (
  page: Page,
  customFieldsGetter: SearchProCustomFieldOptions[] = [],
  fullIndex = false
): PageIndex | null => {
  const result: PageIndex = {
    title: page.title,
    contents: [],
  };
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
        if (currentContent && fullIndex) {
          // add last content
          currentHeaderContent?.contents.push(
            currentContent.replace(/\s+/gu, " ")
          );
          currentContent = "";
        }

        if (isContentBeforeFirstHeader) {
          // the content before the first header shall have actual contents
          if (currentHeaderContent.contents.length)
            result.contents.push(currentHeaderContent);

          isContentBeforeFirstHeader = false;
        } else result.contents.push(currentHeaderContent);

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
        if (currentContent && fullIndex) {
          // add last content
          currentHeaderContent?.contents.push(
            currentContent.replace(/\s+/gu, " ")
          );
          currentContent = "";
        }
        node.childNodes.forEach(render);
      } else if (CONTENT_INLINE_TAGS.includes(node.name))
        node.childNodes.forEach(render);
    } else if (node.type === "text")
      currentContent += node.data.trim() ? node.data : "";
  };

  const nodes = $.parseHTML(page.contentRendered);
  const customFields = Object.fromEntries(
    customFieldsGetter
      .map(({ name, getter }) => {
        const result = getter(page);

        return Array.isArray(result)
          ? [name, result]
          : result
          ? [name, [result]]
          : null;
      })
      .filter((item): item is [string, string[]] => item !== null)
  );

  if (!nodes?.length && !Object.keys(customFields).length) return null;

  nodes?.forEach((node) => {
    render(node);
  });

  // push contents in last block tags
  if (currentContent && fullIndex)
    currentHeaderContent?.contents.push(currentContent);

  // push last content
  if (currentHeaderContent.contents.length)
    result.contents.push(currentHeaderContent);

  return {
    ...result,
    ...(Object.keys(customFields).length ? { customFields } : {}),
  };
};
