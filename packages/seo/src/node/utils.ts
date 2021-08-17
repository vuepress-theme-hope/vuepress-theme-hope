export const md2text = (content?: string): string =>
  content
    ? stripTags(content)
        // remove img
        .replace(/!\[(.*?)\]\(.*?\)/gm, "")
        // remove code blocks
        .replace(/```([\s\S]*?)```/g, "")
        // remove custom container end
        .replace(/^\s*:::\s*$/gm, "")
        // remove custom container start
        .replace(/^\s*:::\s*(.+?)(?:\s+(.*))?$/gm, "$2")
        // remove heading1
        .replace(/^# (.*)$/gm, "$1")
        // convert other headings to text
        .replace(/^#{1,6} (.*)$/gm, "$1")
        // convert unordered lists to text with comma
        .replace(/^\s*[-*+] (.*)$/gm, "$1; ")
        // convert blockquotes with quotes
        .replace(/^\s*>+(.*)$/gm, '"$1"')
        // convert links to text
        .replace(/(^|[^\\])\[(.*?)\]\(.*?\)/gm, "$1$2")
        // convert inline code
        .replace(/`{1,2}([^`])(.*?)`{1,2}/g, "$1$2")
        // just remove delete lines
        .replace(/~~(.*?)~~/g, "")
        // remove bold or italic
        .replace(/(^|[^\\])([*|_]{1,2})(.*?)([^\\])\2/gm, "$1$3$4")
        // remove html tags
        .replace(/<\/?.+?\/?>/g, "")
        // trim lines
        .split("\n")
        .map((line) => line.trim())
        .join("\n")
        // covert link breaks into spaces
        .replace(/(?:\r?\n)+/g, " ")
        // covert 2 or more spaces into 1
        .replace(/ +/g, " ")
        // trim
        .trim()
    : "";

export const stripTags = (content = ""): string =>
  content
    // remove html tags
    .replace(/<\/?.+?\/?>/g, "");

export const resolveUrl = (base: string, url: string): string =>
  `${base.replace(/^\/?/u, "/").replace(/\/?$/u, "/")}${url.replace(
    /^\//u,
    ""
  )}`;
