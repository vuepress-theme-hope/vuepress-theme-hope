import { encodeData, entries, keys } from "@vuepress/helper";
import type { PluginSimple } from "markdown-it";
import type { RuleBlock } from "markdown-it/lib/parser_block.js";
import type {
  SandpackFile,
  SandpackOptions,
  SandpackPredefinedTemplate,
  SandpackSetup,
} from "sandpack-vue3";

import { encodeFiles, getAttrs } from "./utils.js";
import type { SandpackData } from "../../typings/index.js";
import { escapeHtml } from "../utils.js";

const AT_MARKER = `@`;
const VALID_MARKERS = ["file", "options", "setup"] as const;

const propsGetter = (sandpackData: SandpackData): Record<string, string> => ({
  title: sandpackData.title || "",
  template: sandpackData.template || "",
  files: encodeData(encodeFiles(sandpackData.files || {})),
  options: encodeData(JSON.stringify(sandpackData.options || {})),
  customSetup: encodeData(JSON.stringify(sandpackData.customSetup || {})),
});

const jsRunner = (jsCode: string): unknown =>
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  new Function(`return ${jsCode};`)();

const getSandpackRule =
  (name: string): RuleBlock =>
  (state, startLine, endLine, silent) => {
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];

    /*
     * Check out the first character quickly,
     * this should filter out most of non-containers
     */
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

    const content = params.trim();
    const firstSpace = content.indexOf(" ");
    let containerName = "";
    let title = "";

    if (firstSpace > 0) {
      containerName = content.substring(0, firstSpace);
      // Remove attrs
      title = content
        .substring(firstSpace + 1)
        .replace(/(?<!\\)\[([^}]*)\]/g, "");
    } else {
      containerName = content;
    }

    // If (containerName !== name) return false;
    if (!containerName.includes(name)) return false;

    // Since start is found, we can report success here in validation mode
    if (silent) return true;

    // Search for the end of the block
    let nextLine = startLine;
    let autoClosed = false;

    // Search for the end of the block
    while (
      /*
       * Unclosed block should be auto closed by end of document.
       * also block seems to be auto closed by end of parent
       */
      nextLine < endLine
    ) {
      nextLine += 1;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (start < max && state.sCount[nextLine] < state.blkIndent)
        /*
         * Non-empty line with negative indent should stop the list:
         * - ```
         *  test
         */
        break;

      if (
        // Match start

        state.src[start] === ":" &&
        // Closing fence should be indented less than 4 spaces
        state.sCount[nextLine] - state.blkIndent < 4
      ) {
        // Check rest of marker
        for (pos = start + 1; pos <= max; pos++)
          if (state.src[pos] !== ":") break;

        // Closing code fence must be at least as long as the opening one
        if (pos - start >= markerCount) {
          // Make sure tail has spaces only
          pos = state.skipSpaces(pos);

          if (pos >= max) {
            // Found!
            autoClosed = true;
            break;
          }
        }
      }
    }

    const oldParent = state.parentType;
    const oldLineMax = state.lineMax;

    // @ts-expect-error
    state.parentType = `${name}`;

    // This will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine - (autoClosed ? 1 : 0);

    const openToken = state.push(`${name}_open`, "template", 1);

    openToken.markup = markup;
    openToken.content = content;
    openToken.block = true;
    openToken.info = title;
    openToken.map = [startLine, nextLine - (autoClosed ? 1 : 0)];

    state.md.block.tokenize(
      state,
      startLine + 1,
      nextLine - (autoClosed ? 1 : 0),
    );

    const closeToken = state.push(`${name}_close`, "template", -1);

    closeToken.markup = state.src.slice(start, pos);
    closeToken.block = true;

    state.parentType = oldParent;
    state.lineMax = oldLineMax;
    state.line = nextLine + (autoClosed ? 1 : 0);

    return true;
  };

const atMarkerRule =
  (markerName: string): RuleBlock =>
  (state, startLine, endLine, silent) => {
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];

    const atMarker = `${AT_MARKER}${markerName}`;

    /*
     * Check out the first character quickly,
     * this should filter out most of non-uml blocks
     */
    if (state.src.charAt(start) !== "@") return false;

    let index;

    // Check out the rest of the marker string
    for (index = 0; index < atMarker.length; index++)
      if (atMarker[index] !== state.src[start + index]) return false;

    const markup = state.src.slice(start, start + index);
    const info = state.src.slice(start + index, max);

    // Since start is found, we can report success here in validation mode
    if (silent) return true;

    let nextLine = startLine;
    let autoClosed = false;

    // Search for the end of the block
    while (
      /*
       * Unclosed block should be auto closed by end of document.
       * also block seems to be auto closed by end of parent
       */
      nextLine < endLine
    ) {
      nextLine += 1;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (start < max && state.sCount[nextLine] < state.blkIndent)
        /*
         * Non-empty line with negative indent should stop the list:
         * - ```
         *  test
         */
        break;

      if (
        // Match start
        state.src[start] === AT_MARKER &&
        // Marker should not be indented with respect of opening fence
        state.sCount[nextLine] <= state.sCount[startLine]
      ) {
        let openMakerMatched = true;

        for (index = 0; index < atMarker.length; index++)
          if (atMarker[index] !== state.src[start + index]) {
            openMakerMatched = false;
            break;
          }

        if (openMakerMatched) {
          // Found!
          autoClosed = true;
          nextLine -= 1;
          break;
        }
      }
    }

    const oldParent = state.parentType;
    const oldLineMax = state.lineMax;

    // @ts-expect-error
    state.parentType = `${markerName}`;

    // This will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine;

    const openToken = state.push(`${markerName}_open`, "template", 1);

    openToken.block = true;
    openToken.markup = markup;
    openToken.info = info.trim();

    openToken.map = [startLine, nextLine];

    state.md.block.tokenize(state, startLine + 1, nextLine);

    const closeToken = state.push(`${markerName}_close`, "template", -1);

    closeToken.block = true;
    closeToken.markup = "";

    state.parentType = oldParent;
    state.lineMax = oldLineMax;
    state.line = nextLine + (autoClosed ? 1 : 0);

    return true;
  };

export const sandpack: PluginSimple = (md) => {
  md.block.ruler.before("fence", "sandpack", getSandpackRule("sandpack"), {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });

  VALID_MARKERS.forEach((marker) => {
    // WARNING:  Here we use an internal variable to make sure tab rule is not registered

    // @ts-ignore
    // eslint-disable-next-line
    if (!md.block.ruler.__rules__.find(({ name }) => name === `at-${marker}`))
      md.block.ruler.before("fence", `at-${marker}`, atMarkerRule(marker), {
        alt: ["paragraph", "reference", "blockquote", "list"],
      });
  });

  md.renderer.rules["sandpack_open"] = (tokens, index): string => {
    const { content, info } = tokens[index];

    const attrs = getAttrs(content);

    const sandpackData: SandpackData = {
      title: encodeURIComponent(info),
      files: {},
      options: {},
      customSetup: {},
    };

    const containerName = content.split(" ", 2)[0].trim();
    const arr = containerName.split("#");

    if (arr.length > 1)
      sandpackData.template = <SandpackPredefinedTemplate>arr[1];

    let currentKey: string | null = null;
    let foundOptions = false;
    let foundSetup = false;

    for (let i = index; i < tokens.length; i++) {
      const { block, type, info, content } = tokens[i];

      if (block) {
        if (type === "sandpack_close") break;
        if (type === "sandpack_open") continue;
        if (type === "file_open") {
          // File rule must contain a valid file name
          if (!info) continue;
          currentKey = info.trim().split(" ")[0];

          const fileAttrs = getAttrs(info);

          sandpackData.files[currentKey] = {
            code: "",
            active: "active" in fileAttrs,
            hidden: "hidden" in fileAttrs,
            readOnly: "readOnly" in fileAttrs,
          };
        } else if (
          type === "file_close" ||
          type === "setup_open" ||
          type === "options_open"
        ) {
          currentKey = null;
        }

        if (type === "setup_open") foundSetup = true;
        else if (type === "setup_close") foundSetup = false;
        else if (type === "options_open") foundOptions = true;
        else if (type === "options_close") foundOptions = false;

        if (
          type === "file_close" ||
          type === "setup_close" ||
          type === "options_close" ||
          !content
        ) {
          tokens[i].type = "sandpack_empty";
          tokens[i].hidden = true;
          continue;
        }

        // Parse options
        if (foundOptions) {
          if (type === "fence" && (info === "js" || info === "javascript"))
            sandpackData.options = <SandpackOptions>jsRunner(content.trim());

          foundOptions = false;
        }

        // Parse setup
        if (foundSetup) {
          if (type === "fence" && (info === "js" || info === "javascript"))
            sandpackData.customSetup = <SandpackSetup>jsRunner(content.trim());

          foundSetup = false;
        }

        // Add code block content
        if (type === "fence" && currentKey)
          (sandpackData.files[currentKey] as SandpackFile).code = content;

        tokens[i].type = "sandpack_empty";
        tokens[i].hidden = true;
      }
    }

    const props = propsGetter(sandpackData);

    return `<SandPack ${
      keys(attrs).length
        ? `${entries(attrs)
            .map(([attr, value]) =>
              value ? `${attr}="${escapeHtml(value)}"` : attr,
            )
            .join(" ")} `
        : ""
    }${entries(props)
      .map(([attr, value]) => (value ? `${attr}="${escapeHtml(value)}"` : null))
      .filter(Boolean)
      .join(" ")}>\n`;
  };

  md.renderer.rules["sandpack_close"] = (): string => `</SandPack>\n`;
};
