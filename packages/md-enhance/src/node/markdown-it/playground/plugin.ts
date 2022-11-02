import { hash } from "@vuepress/utils";
import { escapeHtml } from "../utils.js";

import type { PluginWithOptions } from "markdown-it";
import type { RuleBlock } from "markdown-it/lib/parser_block.js";
import type {
  PlaygroundData,
  PlaygroundOptions,
} from "../../../shared/index.js";

const AT_MARKER = `@`;
const VALID_MARKERS = ["file", "import", "setting"];

const getPlaygroundRule =
  (name: string): RuleBlock =>
  (state, startLine, endLine, silent) => {
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
    state.parentType = `${name}`;

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine - (autoClosed ? 1 : 0);

    const openToken = state.push(`${name}_open`, "template", 1);

    openToken.markup = markup;
    openToken.block = true;
    openToken.info = title;
    openToken.map = [startLine, nextLine - (autoClosed ? 1 : 0)];

    state.md.block.tokenize(
      state,
      startLine + 1,
      nextLine - (autoClosed ? 1 : 0)
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
        state.src[start] === AT_MARKER &&
        // marker should not be indented with respect of opening fence
        state.sCount[nextLine] <= state.sCount[startLine]
      ) {
        let openMakerMatched = true;

        for (index = 0; index < atMarker.length; index++)
          if (atMarker[index] !== state.src[start + index]) {
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
    state.parentType = `${markerName}`;

    // this will prevent lazy continuations from ever going past our end marker
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

export const playground: PluginWithOptions<PlaygroundOptions> = (
  md,
  { name = "playground", component = "Playground", propsGetter } = {
    name: "playground",
    component: "Playground",
    propsGetter: (playgroundData: PlaygroundData): Record<string, string> => ({
      key: playgroundData.key,
      title: playgroundData.title || "",
      files: encodeURIComponent(JSON.stringify(playgroundData.files)),
      settings: encodeURIComponent(
        JSON.stringify(playgroundData.settings || {})
      ),
    }),
  }
) => {
  md.block.ruler.before("fence", `${name}`, getPlaygroundRule(name), {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });

  VALID_MARKERS.forEach((marker) => {
    // WARNING:  Here we use an internal variable to make sure tab rule is not registered
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line
    if (!md.block.ruler.__rules__.find(({ name }) => name === "marker"))
      md.block.ruler.before("fence", "tab", atMarkerRule(marker), {
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
        } else if (type === "import_open")
          playgroundData.importMap = currentKey = info || "import-map.json";

        if (type === "setting_open") foundSettings = true;
        if (type === "setting_close") foundSettings = false;

        if (
          type === "file_close" ||
          type === "import_close" ||
          type === "setting_close" ||
          !content
        ) {
          tokens[i].type = `${name}_empty`;
          tokens[i].hidden = true;
          continue;
        }

        // parse settings
        if (foundSettings) {
          if (type === "fence" && info === "json")
            playgroundData.settings = <Record<string, unknown>>(
              JSON.parse(content.trim())
            );
        }
        // add code block content
        else if (type === "fence" && currentKey)
          playgroundData.files[currentKey] = {
            ext: info,
            content: content,
          };

        tokens[i].type = `${name}_empty`;
        tokens[i].hidden = true;
      }
    }

    const props = propsGetter(playgroundData);

    return `<${component} ${Object.entries(props)
      .map(([attr, value]) => `${attr}="${escapeHtml(value)}"`)
      .join(" ")}>\n`;
  };

  md.renderer.rules[`${name}_close`] = (): string => `</${component}>\n`;
};
