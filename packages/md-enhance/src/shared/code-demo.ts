export interface CodeDemoGlobalOptions {
  /**
   * 引入的 JS 外部库链接
   *
   * JS Libray links
   */
  jsLib: string[];
  /**
   * 引入的 CSS 外部库链接
   *
   * CSS Libray links
   */
  cssLib: string[];
  /**
   * 是否显示 JSFiddle 按钮
   *
   * Whether display JSFiddle button
   *
   * @default true
   */
  jsfiddle: boolean;
  /**
   * 是否显示 CodePen 按钮
   *
   * Whether display CodePen button
   *
   * @default true
   */
  codepen: boolean;
  /**
   * 是否水平显示代码和视图窗口
   *
   * Whether display code and output horizontally
   *
   * @default false
   */
  horizontal: false;
  /**
   * CodePen 编辑器布局
   *
   * CodePen editor layout
   *
   * @default "left"
   */
  codepenLayout: "top" | "left" | "right";
  /**
   * CodePen 编辑器显示情况
   *
   * CodePen Editor Display
   *
   * @default "101"
   */
  editors: "101" | "100" | "110" | "111" | "011" | "001" | "010";
  /**
   * Vue lib address
   *
   * @default "https://cdn.jsdelivr.net/npm/vue@next/dist/vue.global.prod.js"
   */
  vue: string;
  /**
   * React lib address
   *
   * @default "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
   */
  react: string;
  /**
   * ReactDOM lib address
   *
   * @default "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
   */
  reactDOM: string;
}

export type CodeDemoOptions = Omit<
  CodeDemoGlobalOptions,
  "vue" | "react" | "reactDOM"
>;
