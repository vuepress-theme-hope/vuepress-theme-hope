import { entries } from "@vuepress/helper";
import type { PluginWithOptions } from "markdown-it";
import type { RuleBlock } from "markdown-it/lib/parser_block.js";
import { hash } from "vuepress/utils";

import type { PlaygroundData, PlaygroundOptions } from "../../typings/index.js";
import { escapeHtml } from "../utils.js";

const AT_MARKER = `@`;
const VALID_MARKERS = ["file", "import", "setting"] as const;

const getPlaygroundRule =
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

    const containerName = params.trimStart().split(" ", 2)[0];

    const title = params.trimStart().slice(name.length).trim();

    if (containerName.trim() !== name) return false;

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

const defaultPropsGetter = (
  playgroundData: PlaygroundData,
): Record<string, string> => ({
  key: playgroundData.key,
  title: playgroundData.title || "",
  files: encodeURIComponent(JSON.stringify(playgroundData.files)),
  settings: encodeURIComponent(JSON.stringify(playgroundData.settings || {})),
});

export const playground: PluginWithOptions<PlaygroundOptions> = (
  md,
  {
    name = "playground",
    component = "Playground",
    propsGetter = defaultPropsGetter,
  } = {
    name: "playground",
    component: "Playground",
    propsGetter: defaultPropsGetter,
  },
) => {
  md.block.ruler.before("fence", `${name}`, getPlaygroundRule(name), {
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

  md.renderer.rules[`${name}_open`] = (tokens, index): string => {
    const { info } = tokens[index];

    const playgroundData: PlaygroundData = {
      key: hash(`playground${index}-${info}`),
      title: encodeURIComponent(info),
      settings: {},
      files: {},
    };

    let currentKey: string | null = null;
    let foundSettings = false;

    for (let i = index; i < tokens.length; i++) {
      const { block, type, info, content } = tokens[i];

      if (block) {
        if (type === `${name}_close`) break;
        if (type === `${name}_open`) continue;

        if (type === "file_open") {
          // File rule must contain a valid file name
          if (!info) continue;
          currentKey = info;
        } else if (type === "import_open") {
          playgroundData.importMap = currentKey = info || "import-map.json";
        } else if (type === "setting_open") {
          foundSettings = true;
        } else if (
          type === "file_close" ||
          type === "import_close" ||
          type === "setting_close" ||
          !content
        ) {
          tokens[i].type = `${name}_empty`;
          tokens[i].hidden = true;
          if (type === "setting_close") foundSettings = false;
          continue;
        }

        // Parse settings
        if (foundSettings) {
          // Handle json blocks
          if (type === "fence" && info === "json")
            playgroundData.settings = <Record<string, unknown>>(
              JSON.parse(content.trim())
            );
        }
        // Add code block content
        else if (type === "fence" && currentKey) {
          playgroundData.files[currentKey] = {
            ext: info,
            content,
          };
        }

        tokens[i].type = `${name}_empty`;
        tokens[i].hidden = true;
      }
    }

    const props = propsGetter(playgroundData);

    return `<${component} ${entries(props)
      .map(([attr, value]) => `${attr}="${escapeHtml(value)}"`)
      .join(" ")}>\n`;
  };

  md.renderer.rules[`${name}_close`] = (): string => `</${component}>\n`;
};
