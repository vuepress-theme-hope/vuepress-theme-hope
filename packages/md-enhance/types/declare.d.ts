declare module "@vuepress/markdown/lib/lineNumbers" {
  const lineNumbers: (md: any) => any;

  export = lineNumbers;
}

declare module "flowchart.js" {
  interface Parse {
    drawSVG: (id: string, options: any) => void;
  }

  interface Flowchart {
    parse: (input: string) => Parse;
  }

  const flowchart: Flowchart;

  export = flowchart;
}
