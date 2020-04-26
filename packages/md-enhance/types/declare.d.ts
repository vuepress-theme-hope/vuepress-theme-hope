declare module '@vuepress/markdown/lib/lineNumbers' {
  const lineNumbers: (md: any) => any;

  export = lineNumbers;
}

declare module 'flowchart.js' {
  export interface Flowchart {
    parse: (input: any) => any;
  }

  const flowchart: Flowchart;

  export default flowchart;
}
