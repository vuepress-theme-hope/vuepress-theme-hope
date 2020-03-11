/*
 * @Author: Mr.Hope
 * @Date: 2020-01-13 18:40:39
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-11 15:36:45
 * @Description: 模块声明
 */

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
