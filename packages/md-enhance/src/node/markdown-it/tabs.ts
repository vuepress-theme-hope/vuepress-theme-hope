import type { Options, PluginWithOptions } from "markdown-it";
import type { RuleBlock } from "markdown-it/lib/parser_block.js";
import type { default as Renderer } from "markdown-it/lib/renderer.js";
import type { default as Token } from "markdown-it/lib/token.js";

interface BaseTabData {
  title: string;
  value?: string;
}

export interface TabOptions {
  name: string;
  component: string;
  getter: (
    tokens: Token[],
    index: number,
    options: Options,
    env: unknown,
    self: Renderer
  ) => Record<string, unknown>[];
}

export const tabs: PluginWithOptions<TabOptions> = (
  md,
  { name, component, getter } = {
    name: "tabs",
    component: "Tabs",
    getter: () => [],
  }
) => {
  const CODETAB_MARKER = `@tab`;

  const tabsRule: RuleBlock = (state, startLine, endLine, silent) => {
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];

    // Check out the first character quickly,
    // this should filter out most of non-containers
    if (state.src[start] !== ":") return false;

    let pos = start + 1;

    // Check out the rest of the marker string
    while (pos <= max) {
      if (state.src[pos] !== ":") break;
      pos += 1;
    }

    const markerCount = pos - start;

    if (markerCount < 3) return false;

    const markup = state.src.slice(start, pos);
    const params = state.src.slice(pos, max);

    const [containerName, id = ""] = params.split("#", 2);

    if (containerName.trim() !== name) return false;

    // Since start is found, we can report success here in validation mode
    if (silent) return true;

    // Search for the end of the block
    let nextLine = startLine;
    let autoClosed = false;

    // Search for the end of the block
    while (
      // unclosed block should be auto closed by end of document.
      // also block seems to be auto closed by end of parent
      nextLine < endLine
    ) {
      nextLine += 1;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (start < max && state.sCount[nextLine] < state.blkIndent)
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;

      if (
        // match start

        state.src[start] === ":" &&
        // closing fence should be indented less than 4 spaces
        state.sCount[nextLine] - state.blkIndent < 4
      ) {
        // check rest of marker
        for (pos = start + 1; pos <= max; pos++)
          if (state.src[pos] !== ":") break;

        // closing code fence must be at least as long as the opening one
        if (pos - start >= markerCount) {
          // make sure tail has spaces only
          pos = state.skipSpaces(pos);

          if (pos >= max) {
            // found!
            autoClosed = true;
            break;
          }
        }
      }
    }

    const oldParent = state.parentType;
    const oldLineMax = state.lineMax;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    state.parentType = `${name}_tabs`;

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine - (autoClosed ? 1 : 0);

    const openToken = state.push(`${name}_tabs_open`, component, 1);

    openToken.markup = markup;
    openToken.block = true;
    openToken.info = containerName;
    openToken.meta = { id: id.trim() };
    openToken.map = [startLine, nextLine - (autoClosed ? 1 : 0)];

    state.md.block.tokenize(
      state,
      startLine + 1,
      nextLine - (autoClosed ? 1 : 0)
    );

    const closeToken = state.push(`${name}_tabs_close`, component, -1);

    closeToken.markup = state.src.slice(start, pos);
    closeToken.block = true;

    state.parentType = oldParent;
    state.lineMax = oldLineMax;
    state.line = nextLine + (autoClosed ? 1 : 0);

    return true;
  };

  const tabRule: RuleBlock = (state, startLine, endLine, silent) => {
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];

    /*
     * Check out the first character quickly,
     * this should filter out most of non-uml blocks
     */
    if (state.src.charAt(start) !== "@") return false;

    let index;

    // Check out the rest of the marker string
    for (index = 0; index < CODETAB_MARKER.length; index++)
      if (CODETAB_MARKER[index] !== state.src[start + index]) return false;

    const markup = state.src.slice(start, start + index);
    const info = state.src.slice(start + index, max);

    // Since start is found, we can report success here in validation mode
    if (silent) return true;

    let nextLine = startLine;
    let autoClosed = false;

    // Search for the end of the block
    while (
      // unclosed block should be auto closed by end of document.
      // also block seems to be auto closed by end of parent
      nextLine < endLine
    ) {
      nextLine += 1;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (start < max && state.sCount[nextLine] < state.blkIndent)
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;

      if (
        // match start
        state.src[start] === "@" &&
        // marker should not be indented with respect of opening fence
        state.sCount[nextLine] <= state.sCount[startLine]
      ) {
        let openMakerMatched = true;

        for (index = 0; index < CODETAB_MARKER.length; index++)
          if (CODETAB_MARKER[index] !== state.src[start + index]) {
            openMakerMatched = false;
            break;
          }

        if (openMakerMatched) {
          // found!
          autoClosed = true;
          nextLine -= 1;
          break;
        }
      }
    }

    const oldParent = state.parentType;
    const oldLineMax = state.lineMax;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    state.parentType = `tab`;

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine;

    const openToken = state.push("tab_open", "template", 1);

    const [title, id] = info.replace(/^:active/, "").split("#", 2);

    openToken.block = true;
    openToken.markup = markup;
    openToken.info = title.trim();
    openToken.meta = {
      active: info.includes(":active"),
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (id) openToken.meta.value = id.trim();
    openToken.map = [startLine, nextLine];

    state.md.block.tokenize(state, startLine + 1, nextLine);

    const closeToken = state.push("tab_close", "template", -1);

    closeToken.block = true;
    closeToken.markup = "";

    state.parentType = oldParent;
    state.lineMax = oldLineMax;
    state.line = nextLine + (autoClosed ? 1 : 0);

    return true;
  };

  md.block.ruler.before("fence", `${name}_tabs`, tabsRule, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });

  // WARNING:  Here we use an internal variable to make sure tab rule is not registered
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line
  if (!md.block.ruler.__rules__.find(({ name }) => name === "tab"))
    md.block.ruler.before("fence", "tab", tabRule, {
      alt: ["paragraph", "reference", "blockquote", "list"],
    });

  md.renderer.rules[`${name}_tabs_open`] = (
    tokens,
    index,
    options,
    env,
    self
  ): string => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { meta } = tokens[index];
    const basicData: BaseTabData[] = [];
    const customData = getter(tokens, index, options, env, self);
    let activeIndex = -1;
    let isTabStart = false;

    for (let i = index; i < tokens.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { block, meta, type, info } = tokens[i];

      if (block) {
        if (type === `${name}_tabs_close`) break;
        if (type === `${name}_tabs_open`) continue;

        if (type === "tab_open") {
          // code tab is active
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (meta.active) activeIndex = basicData.length;

          tokens[i].attrPush([
            `#tab${basicData.length}`,
            "{ title, value, isActive }",
          ]);

          isTabStart = true;
          basicData.push({
            title: info,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            ...(meta.value ? { value: meta.value as string } : {}),
          });

          continue;
        }

        if (type === "tab_close") continue;

        if (!isTabStart) {
          tokens[i].type = `${name}_tabs_empty`;
          tokens[i].hidden = true;
        }
      }
    }

    const data = basicData.map((item, index) => ({
      ...item,
      ...customData[index],
    }));

    return `<${component} id="${index}" :data='${
      // single quote will break @vue/compiler-sfc
      JSON.stringify(data).replace(/'/g, "&#39")
    }'${activeIndex !== -1 ? ` :active="${activeIndex}"` : ""}${
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      meta.id ? ` tab-id="${meta.id as string}"` : ""
    }>\n`;
  };

  md.renderer.rules[`${name}_tabs_close`] = (): string => `</${component}>\n`;
};
