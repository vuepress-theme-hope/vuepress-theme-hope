declare module "@vuepress/markdown/lib/lineNumbers" {
  import MarkdownIt = require("markdown-it");
  const lineNumbers: (md: MarkdownIt) => void;

  export = lineNumbers;
}

declare module "flowchart.js" {
  interface Parse {
    drawSVG: (id: string, options: never) => void;
  }

  interface Flowchart {
    parse: (input: string) => Parse;
  }

  const flowchart: Flowchart;

  export = flowchart;
}
