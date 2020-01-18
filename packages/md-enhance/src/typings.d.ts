/*
 * @Author: Mr.Hope
 * @Date: 2020-01-13 18:40:39
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-18 16:44:12
 * @Description: 模块声明
 */

declare module 'flowchart.js' {
  export interface Flowchart {
    parse: (input: any) => any;
  }

  const flowchart: Flowchart;

  export default flowchart;
}

declare module '@vuepress/markdown/lib/lineNumbers' {
  const lineNumbers: (md: any) => any;

  export = lineNumbers;
}
