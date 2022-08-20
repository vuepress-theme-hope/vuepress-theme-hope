import { fs, path } from "@vuepress/utils";
import { NEWLINES_RE } from "./utils";

import type { MarkdownEnv } from "@vuepress/markdown";
import type { PluginWithOptions } from "markdown-it";
import type { RuleCore } from "markdown-it/lib/parser_core";
import Token from "markdown-it/lib/token";
import type { IncludeOptions } from "../../shared";

interface ImportFileInfo {
  filePath: string;
  lineStart: number;
  lineEnd: number | undefined;
}

interface IncludeInfo {
  cwd: string | null;
  includedFiles: string[];
  resolvedPath?: boolean;
}

// regexp to match the import syntax
const SYNTAX_RE = /^@include\(([^)]*?)(?:\{(\d+)?-(\d+)?\})?\)$/;

export const handleInclude = (
  { filePath, lineStart, lineEnd }: ImportFileInfo,
  { cwd, includedFiles, resolvedPath }: IncludeInfo
): string => {
  let realPath = filePath;

  if (!path.isAbsolute(filePath)) {
    // if the importPath is relative path, we need to resolve it
    // according to the markdown filePath
    if (!cwd) {
      console.error(`Include: Error when resolving path: ${filePath}`);

      return "\nError when resolving path\n";
    }

    realPath = path.resolve(cwd, filePath);
  }

  includedFiles.push(realPath);

  // check file existence
  if (!fs.existsSync(realPath)) {
    console.error(`Include: ${realPath} not found`);

    return "\nFile not found\n";
  }

  // read file content
  const fileContent = fs.readFileSync(realPath).toString();

  // return content
  const result = fileContent
    .replace(NEWLINES_RE, "\n")
    .split("\n")
    .slice(lineStart ? lineStart - 1 : lineStart, lineEnd);

  if (resolvedPath && realPath.endsWith(".md")) {
    const dirName = path.dirname(realPath);
    result.unshift(`@include-push(${dirName})`);
    result.push("@include-pop()");
  }

  return result
    .join("\n")
    .replace(/\n?$/, "\n");
};

export const resolveInclude = (
  content: string,
  options: Required<IncludeOptions>,
  { cwd, includedFiles }: IncludeInfo
): string =>
  content
    .split("\n")
    .map((line) => {
      if (line.startsWith("@include")) {
        // check if it’s matched the syntax
        const match = line.match(SYNTAX_RE);

        if (match) {
          const [, includePath, lineStart, lineEnd] = match;
          const actualPath = options.getPath(includePath);
          const resolvedPath = options.resolveImagePath || options.resolveLinkPath;

          const content = handleInclude(
            {
              filePath: actualPath,
              lineStart: lineStart ? Number.parseInt(lineStart, 10) : 0,
              lineEnd: lineEnd ? Number.parseInt(lineEnd, 10) : undefined,
            },
            { cwd, includedFiles, resolvedPath }
          );

          return options.deep && actualPath.endsWith(".md")
            ? resolveInclude(content, options, {
                cwd: path.isAbsolute(actualPath)
                  ? path.dirname(actualPath)
                  : cwd
                  ? path.resolve(cwd, path.dirname(actualPath))
                  : null,
                includedFiles,
              })
            : content;
        }
      }

      return line;
    })
    .join("\n");

export const createIncludeCoreRule =
  (options: Required<IncludeOptions>): RuleCore =>
  (state): void => {
    const env = <
      MarkdownEnv & {
        /** Files included */
        includedFiles?: string[];
      }
    >state.env;
    const includedFiles = env.includedFiles || (env.includedFiles = []);

    state.src = resolveInclude(state.src, options, {
      cwd: env.filePath ? path.dirname(env.filePath) : null,
      includedFiles,
    });
  };

const SYNTAX_PUSH_RE = /^@include-push\(([^)]*?)\)$/;
const SYNTAX_POP_RE = /^@include-pop\(\)$/;
function resolvePush(content: string, includedPaths: string[]): string {
  return   content
  .split("\n")
  .map((line) => {
    if (line.startsWith("@include-push")) {
      // check if it’s matched the syntax
      const match = line.match(SYNTAX_PUSH_RE);

      if (match) {
        const [, includePath] = match;
        includedPaths.push(includePath)
        line = ""
      }
    }
    return line;
  })
  .join("\n");
}
function resolvePop(content: string, includedPaths: string[]): string {
  return   content
  .split("\n")
  .map((line) => {
    if (line.startsWith("@include-pop")) {
      // check if it’s matched the syntax
      const match = line.match(SYNTAX_POP_RE);

      if (match) {
        includedPaths.pop()
        line = ""
      }
    }
    return line;
  })
  .join("\n");
}

const includePushRule: RuleCore = (state)  => {
  const env = <
  MarkdownEnv & {
    /** included current paths */
    includedPaths?: string[];
  }
  >state.env;
  const includedPaths = env.includedPaths || (env.includedPaths = []);
  state.src = resolvePush(state.src, includedPaths);
}

const includePopRule: RuleCore = (state)  => {
  const env = <
  MarkdownEnv & {
    /** included current paths */
    includedPaths?: string[];
  }
  >state.env;
  const includedPaths = env.includedPaths || (env.includedPaths = []);
  state.src = resolvePop(state.src, includedPaths);
}

function resolveRelatedLink(attr: string, token: Token, filePath: string, includedPaths?: string[]) {
  const aIndex = token.attrIndex(attr);
  let url = token.attrs?.[aIndex][1];
  if (url?.startsWith('.') && filePath) {
    const len = Array.isArray(includedPaths) && includedPaths.length;
    if (len) {
      const includeDir = path.relative(path.dirname(filePath), includedPaths[len-1]);
      url = "." + path.sep + path.join(includeDir, url);
      token.attrs![aIndex][1] = url;
    }
  }
}
export const include: PluginWithOptions<IncludeOptions> = (
  md,
  { getPath = (path: string): string => path, deep = false,
    resolveLinkPath = true, resolveImagePath = true } = {}
): void => {
  // add md_import core rule
  md.core.ruler.after(
    "normalize",
    "md_import",
    createIncludeCoreRule({ getPath, deep, resolveLinkPath, resolveImagePath })
  );

  if (resolveImagePath || resolveLinkPath) {
    md.core.ruler.after(
      "md_import",
      "md_includePush",
      includePushRule
    );
    md.core.ruler.after(
      "md_import",
      "md_includePop",
      includePopRule
    );

    if (resolveImagePath) {
      const defaultRender = md.renderer.rules.image;
      md.renderer.rules.image = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        resolveRelatedLink("src", token, env.filePath, env.includedPaths);
        // pass token to default renderer.
        return defaultRender!(tokens, idx, options, env, self);
      };
    }

    if (resolveLinkPath) {
      const defaultRender = md.renderer.rules["link_open"]  || function(tokens, idx, options, _, self) {
        return self.renderToken(tokens, idx, options);
      };

      md.renderer.rules["link_open"] = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        resolveRelatedLink("href", token, env.filePath, env.includedPaths);
        // pass token to default renderer.
        return defaultRender(tokens, idx, options, env, self);
      };
    }
  }
};
