declare module "@vuepress/markdown/lib/lineNumbers" {
  import MarkdownIt = require("markdown-it");
  const lineNumbers: (md: MarkdownIt) => void;

  export = lineNumbers;
}

declare module "flowchart.js" {
  interface Parse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    drawSVG: (id: string, options: any) => void;
  }

  interface Flowchart {
    parse: (input: string) => Parse;
  }

  const flowchart: Flowchart;

  export = flowchart;
}
