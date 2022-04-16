import { fs, path } from "@vuepress/utils";

import type { MarkdownEnv } from "@vuepress/markdown";
import type { PluginWithOptions } from "markdown-it";
import type { RuleBlock } from "markdown-it/lib/parser_block";

export interface ImportMarkdownTokenMeta {
  importPath: string;
  lineStart: number;
  lineEnd?: number;
}

// min length of the import markdown syntax, i.e. '@[md]()'
const MIN_LENGTH = 9;

// char codes of '@[md'
const START_CODES = [64, 91, 109, 100];

// regexp to match the import syntax
const SYNTAX_RE = /^@\[md(?:{(?:(\d+)?-(\d+)?)})?\]\(([^)]*)\.md\)/;

export const createImportMarkdownBlockRule =
  (handleImportPath: (path: string) => string): RuleBlock =>
  (state, startLine, _endLine, silent): boolean => {
    // if it’s indented more than 3 spaces, it should be a code block
    /* istanbul ignore if */
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }

    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];

    // return false if the length is shorter than min length
    if (pos + MIN_LENGTH > max) return false;

    // check if it’s matched the start
    for (let i = 0; i < START_CODES.length; i += 1)
      if (state.src.charCodeAt(pos + i) !== START_CODES[i]) return false;

    // check if it’s matched the syntax
    const match = state.src.slice(pos, max).match(SYNTAX_RE);

    if (!match) return false;

    // return true as we have matched the syntax
    if (silent) return true;

    const [, lineStart, lineEnd, importPath] = match;

    const meta: ImportMarkdownTokenMeta = {
      importPath: handleImportPath(`${importPath}.md`),
      lineStart: lineStart ? Number.parseInt(lineStart, 10) : 0,
      lineEnd: lineEnd ? Number.parseInt(lineEnd, 10) : undefined,
    };

    // create a md_import token
    const token = state.push("md_import", "code", 0);

    token.map = [startLine, startLine + 1];
    // store token meta to be used in renderer rule
    token.meta = meta;

    state.line = startLine + 1;

    return true;
  };

export const resolveImportMarkdown = (
  { importPath, lineStart, lineEnd }: ImportMarkdownTokenMeta,
  { filePath }: MarkdownEnv
): {
  importFilePath: string | null;
  importContent: string;
} => {
  let importFilePath = importPath;

  if (!path.isAbsolute(importPath)) {
    // if the importPath is relative path, we need to resolve it
    // according to the markdown filePath
    if (!filePath) {
      return {
        importFilePath: null,
        importContent: "Error when resolving path",
      };
    }
    importFilePath = path.resolve(filePath, "..", importPath);
  }

  // check file existence
  if (!fs.existsSync(importFilePath)) {
    return {
      importFilePath,
      importContent: "File not found",
    };
  }

  // read file content
  const fileContent = fs.readFileSync(importFilePath).toString();

  // resolve partial import
  return {
    importFilePath,
    importContent: fileContent
      .split("\n")
      .slice(lineStart ? lineStart - 1 : lineStart, lineEnd)
      .join("\n")
      .replace(/\n?$/, "\n"),
  };
};

export const mdImport: PluginWithOptions<(path: string) => string> = (
  md,
  options
): void => {
  // add md_import block rule
  md.block.ruler.before(
    "fence",
    "md_import",
    createImportMarkdownBlockRule(
      typeof options === "function" ? options : (path): string => path
    ),
    {
      alt: ["paragraph", "reference", "blockquote", "list"],
    }
  );

  // add md_import renderer rule
  md.renderer.rules.md_import = (
    tokens,
    idx,
    _options,
    env: MarkdownEnv
  ): string => {
    const token = tokens[idx];

    // use imported code as token content
    const { importFilePath, importContent } = resolveImportMarkdown(
      token.meta as ImportMarkdownTokenMeta,
      env
    );

    // extract imported files to env
    if (importFilePath) {
      const importedFiles = env.importedFiles || (env.importedFiles = []);

      importedFiles.push(importFilePath);
    }

    // render the md_import token with markdown-it
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return md.render(importContent, env);
  };
};
