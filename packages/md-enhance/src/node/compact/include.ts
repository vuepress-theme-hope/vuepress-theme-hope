import type {
  IncludeEnv,
  MarkdownItIncludeOptions,
} from "@mdit/plugin-include";
import type { PluginWithOptions } from "markdown-it";
import type { RuleCore } from "markdown-it/lib/parser_core.js";
import type { MarkdownEnv } from "vuepress/markdown";
import { fs, path } from "vuepress/utils";

import { NEWLINES_RE } from "../markdown-it/utils.js";
import { logger } from "../utils.js";

interface ImportFileLineInfo {
  filePath: string;
  lineStart: number;
  lineEnd: number | undefined;
}

interface ImportFileRegionInfo {
  filePath: string;
  region: string;
}

type ImportFileInfo = ImportFileLineInfo | ImportFileRegionInfo;

interface IncludeInfo {
  cwd: string | null;
  includedFiles: string[];
  resolvedPath?: boolean;
  currentPath?: string;
}

const REGIONS_RE = [
  /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/u, // Javascript, Typescript, Java
  /^\/\* ?#((?:end)?region) ([\w*-]+) ?\*\/$/u, // CSS, Less, Scss
  /^#pragma ((?:end)?region) ([\w*-]+)$/u, // C, C++
  /^<!-- #?((?:end)?region) ([\w*-]+) -->$/u, // HTML, markdown
  /^#((?:End )Region) ([\w*-]+)$/u, // Visual Basic
  /^::#((?:end)region) ([\w*-]+)$/u, // Bat
  /^# ?((?:end)?region) ([\w*-]+)$/u, // C#, PHP, Powershell, Python, perl & misc
];

// Regexp to match the import syntax
const INCLUDE_RE =
  /^@include\(([^)]+(?:\.[a-z0-9]+))(?:#([\w-]+))?(?:\{(\d+)?-(\d+)?\})?\)$/u;

const dedent = (text: string): string => {
  const lines = text.split("\n");

  const minIndentLength = lines.reduce((acc, line) => {
    for (let i = 0; i < line.length; i++)
      if (line[i] !== " " && line[i] !== "\t") return Math.min(i, acc);

    return acc;
  }, Infinity);

  if (minIndentLength < Infinity)
    return lines.map((x) => x.slice(minIndentLength)).join("\n");

  return text;
};

const testLine = (
  line: string,
  regexp: RegExp,
  regionName: string,
  end = false,
): boolean => {
  const [full, tag, name] = regexp.exec(line.trim()) || [];

  return Boolean(
    full &&
      tag &&
      name === regionName &&
      tag.match(end ? /^[Ee]nd ?[rR]egion$/ : /^[rR]egion$/),
  );
};

const findRegion = (
  lines: string[],
  regionName: string,
): { lineStart: number; lineEnd: number } | null => {
  let regexp = null;
  let lineStart = -1;

  for (const [lineId, line] of lines.entries())
    if (regexp === null) {
      for (const reg of REGIONS_RE)
        if (testLine(line, reg, regionName)) {
          lineStart = lineId + 1;
          regexp = reg;
          break;
        }
    } else if (testLine(line, regexp, regionName, true)) {
      return { lineStart, lineEnd: lineId };
    }

  return null;
};

export const handleInclude = (
  info: ImportFileInfo,
  { cwd, includedFiles, resolvedPath }: IncludeInfo,
): string => {
  const { filePath } = info;
  let realPath = filePath;

  if (!path.isAbsolute(filePath)) {
    /*
     * If the importPath is relative path, we need to resolve it
     * according to the markdown filePath
     */
    if (!cwd) {
      logger.error(`[include]: Error when resolving path: ${filePath}`);

      return "\nError when resolving path\n";
    }

    realPath = path.resolve(cwd, filePath);
  }

  includedFiles.push(realPath);

  // Check file existence
  if (!fs.existsSync(realPath)) {
    logger.error(`Include: ${realPath} not found`);

    return "\nFile not found\n";
  }

  // Read file content
  const fileContent = fs.readFileSync(realPath).toString();

  const lines = fileContent.replace(NEWLINES_RE, "\n").split("\n");
  let results: string[] = [];

  if ("region" in info) {
    const region = findRegion(lines, info.region);

    if (region) results = lines.slice(region.lineStart, region.lineEnd);
  } else {
    const { lineStart, lineEnd } = info;

    results = lines.slice(lineStart ? lineStart - 1 : lineStart, lineEnd);
  }

  if (resolvedPath && realPath.endsWith(".md")) {
    const dirName = path.dirname(realPath);

    results.unshift(`@include-push(${dirName})`);
    results.push("@include-pop()");
  }

  return dedent(results.join("\n").replace(/\n?$/u, "\n"));
};

export const resolveInclude = (
  content: string,
  options: Required<Omit<MarkdownItIncludeOptions, "useComment">>,
  { currentPath, cwd, includedFiles }: IncludeInfo,
): string =>
  content
    .split("\n")
    .map((line) => {
      if (line.startsWith("@include")) {
        // Check if it’s matched the syntax
        const result = line.match(INCLUDE_RE);

        if (result) {
          logger.warn(
            `"@include(file)" is deprecated, you should use "<!-- @include: file -->" instead.${
              currentPath ? `\n Found in ${currentPath}.` : ""
            }`,
          );

          const [, includePath, region, lineStart, lineEnd] = result;
          const actualPath = options.resolvePath(includePath, cwd);
          const resolvedPath =
            options.resolveImagePath || options.resolveLinkPath;

          const content = handleInclude(
            {
              filePath: actualPath,
              ...(region
                ? { region }
                : {
                    lineStart: lineStart ? Number(lineStart) : 0,
                    lineEnd: lineEnd ? Number(lineEnd) : undefined,
                  }),
            },
            { cwd, includedFiles, resolvedPath },
          );

          return options.deep && actualPath.endsWith(".md")
            ? resolveInclude(content, options, {
                cwd: path.isAbsolute(actualPath)
                  ? path.dirname(actualPath)
                  : cwd
                    ? path.resolve(cwd, path.dirname(actualPath))
                    : null,
                currentPath: currentPath ?? "",
                includedFiles,
              })
            : content;
        }
      }

      return line;
    })
    .join("\n");

export const createIncludeCoreRule =
  (options: Required<Omit<MarkdownItIncludeOptions, "useComment">>): RuleCore =>
  (state): void => {
    const env = <IncludeEnv & MarkdownEnv>state.env;
    const includedFiles = (env.includedFiles ||= []);
    const currentPath = options.currentPath(env);

    state.src = resolveInclude(state.src, options, {
      cwd: currentPath ? path.dirname(currentPath) : null,
      currentPath,
      includedFiles,
    });
  };

/** @deprecated */
export const legacyInclude: PluginWithOptions<MarkdownItIncludeOptions> = (
  md,
  options,
): void => {
  const {
    currentPath,
    resolvePath = (path: string): string => path,
    deep = false,
    resolveLinkPath = true,
    resolveImagePath = true,
  } = options || {};

  if (typeof currentPath !== "function") {
    logger.error('[include]: "currentPath" is required');

    return;
  }
  // Add md_import core rule
  md.core.ruler.after(
    "normalize",
    "md_legacy_import",
    createIncludeCoreRule({
      currentPath,
      resolvePath,
      deep,
      resolveLinkPath,
      resolveImagePath,
    }),
  );
};
