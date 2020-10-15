declare module "@vuepress/markdown/lib/lineNumbers" {
  import MarkdownIt = require("markdown-it");
  const lineNumbers: (md: MarkdownIt) => void;

  export = lineNumbers;
}
