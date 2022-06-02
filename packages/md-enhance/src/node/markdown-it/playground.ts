import { hash } from "@vuepress/utils";

import type { Options, PluginWithOptions } from "markdown-it";
import type { RuleBlock } from "markdown-it/lib/parser_block";
import type { default as Renderer } from "markdown-it/lib/renderer";
import type { default as Token } from "markdown-it/lib/token";
import type { PlaygroundOptions } from "../../shared";
import type { PlaygroundFiles } from "../../shared/playground";
import {
  IMPORT_MAP_KEY,
  PLAYGROUND_DEFAULT_SETTING,
} from "../../shared/playground";

const extensions = ["html", "js", "ts", "vue", "jsx", "tsx", "json"];

export interface PlaygroundData {
  id?: string;
  title?: string;
  files?: PlaygroundFiles;
  imports?: string;
  settings?: string;
  customData?: Record<string, unknown>[] | null;
}

export interface PlaygroundPluginOptions {
  name: string;
  component: string;
  playgroundOptions?: PlaygroundOptions;
  getter: (
    tokens: Token[],
    index: number,
    options: Options,
    env: unknown,
    self: Renderer
  ) => Record<string, unknown>[];
}

const AT_MARKER = `@`;

const VALID_MARKERS = ["file", "imports", "settings"];

export const playground: PluginWithOptions<PlaygroundPluginOptions> = (
  md,
  { name, component, playgroundOptions, getter } = {
    name: "playground",
    component: "Playground",
    getter: () => [],
    playgroundOptions: {},
  }
) => {
  const mode = playgroundOptions?.mode ?? PLAYGROUND_DEFAULT_SETTING.mode;
  const defaultImportsMap =
    mode === "internal"
      ? playgroundOptions?.internal?.defaultImportsMap
      : playgroundOptions?.external?.defaultImportsMap;

  const playgroundRule: RuleBlock = (state, startLine, endLine, silent) => {
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

    const [containerName, id] = params
      .trimStart()
      .split(" ", 2)[0]
      .split("#", 2);

    const title = params
      .trimStart()
      .slice(name.length + (id ? id.length + 1 : 0))
      .trim();

    if (containerName.trim() !== name) return false;

    // Since start is found, we can report success here in validation mode
    if (silent) return true;

    // Search for the end of the block
    let nextLine = startLine;
    let autoClosed = false;

    // Search for the end of the block
    while (
      // unclosed block should be autoclosed by end of document.
      // also block seems to be autoclosed by end of parent
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

    const openToken = state.push(`${name}_open`, component, 1);

    openToken.markup = markup;
    openToken.block = true;
    openToken.info = title;
    openToken.meta = { id: id?.trim() };
    openToken.map = [startLine, nextLine - (autoClosed ? 1 : 0)];

    state.md.block.tokenize(
      state,
      startLine + 1,
      nextLine - (autoClosed ? 1 : 0)
    );

    const closeToken = state.push(`${name}_close`, component, -1);

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
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
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

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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

  md.block.ruler.before("fence", `${name}`, playgroundRule, {
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

  md.renderer.rules[`${name}_open`] = (
    tokens,
    index,
    options,
    env,
    self
  ): string => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { meta, info } = tokens[index];
    const hashKey = `${index}-${info}`;
    const key = `playground-${hash(hashKey)}`;

    const playgroundData: PlaygroundData = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: meta.id ? meta.id : key,
      title: encodeURIComponent(info),
      files: {},
      customData: [],
    };
    const customData = getter(tokens, index, options, env, self);

    playgroundData.customData?.concat(customData);

    let settings: string;
    let configKey: string | null = null;
    let isSettings = false;

    for (let i = index; i < tokens.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { block, type, info, content } = tokens[i];

      if (block) {
        if (type === `${name}_close`) break;
        if (type === `${name}_open`) continue;

        if (type === "file_open") {
          const fileName = info;

          if (!fileName || fileName.length === 0) {
            continue;
          }
          configKey = fileName;
        }

        if (type === "imports_open") {
          const fileName = info;

          if (fileName && fileName.length > 0) {
            configKey = fileName;
          } else {
            configKey = defaultImportsMap || IMPORT_MAP_KEY;
          }
        }

        if (type === "settings_open") {
          isSettings = true;
        }

        if (
          type === "file_close" ||
          type === "imports_close" ||
          type === "settings_close"
        ) {
          tokens[i].type = `${name}_empty`;
          tokens[i].hidden = true;
          continue;
        }

        if (!content) {
          tokens[i].type = `${name}_empty`;
          tokens[i].hidden = true;
          continue;
        }

        if (isSettings) {
          if (type === "fence" && info === "json") {
            settings = content.replace(/^\s+|\s+$/g, "").replace(/\/+$/, "");
            playgroundData.settings = encodeURIComponent(settings);
          }
        } else {
          if (type === "fence" && extensions.includes(info) && configKey) {
            playgroundData.files![configKey] = {
              lang: info,
              content: content,
            };
          }
        }

        tokens[i].type = `${name}_empty`;
        tokens[i].hidden = true;
      }
    }

    return `<${component} key="${playgroundData.id!}"
        id="${playgroundData.id!}"
        title="${playgroundData.title || ""}"
        settings="${playgroundData.settings || encodeURIComponent("{}")}"
        config="${encodeURIComponent(JSON.stringify(playgroundData.files!))}"
      >\n`;
  };

  md.renderer.rules[`${name}_close`] = (): string => `</${component}>\n`;
};
