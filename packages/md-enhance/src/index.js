const { path } = require('@vuepress/shared-utils');
const pluginConfig = require('./pluginConfig');
const LINENUMBERS = require('@vuepress/markdown/lib/lineNumbers');
const MARKDOWN_IT_SUB = require('./markdown-it/sub');
const MARKDOWN_IT_SUP = require('./markdown-it/sup');
const MARKDOWN_IT_FOOTNOTE = require('./markdown-it/footnote');
const MARKDOWN_IT_FLOWCHART = require('./markdown-it/flowchart');

module.exports = (option, ctx) => ({
  name: 'md-enhance',

  enhanceAppFiles: path.resolve(__dirname, './enhanceAppFile.js'),

  /** Markdown 增强 */
  chainMarkdown(config) {
    const markdownOption = option || ctx.themeConfig.markdown || {};

    // 添加行号
    if (markdownOption.lineNumbers !== false)
      config.plugin('line-numbers').use(LINENUMBERS);
    // 增加上角标
    if (markdownOption.sup || markdownOption.enableAll)
      config.plugin('sup').use(MARKDOWN_IT_SUP);
    // 增加下角标
    if (markdownOption.sub || markdownOption.enableAll)
      config.plugin('sub').use(MARKDOWN_IT_SUB);
    // 增加脚注
    if (markdownOption.footnote || markdownOption.enableAll)
      config.plugin('subfootnote').use(MARKDOWN_IT_FOOTNOTE);
    // 使用流程图
    if (markdownOption.flowchart || markdownOption.enableAll)
      config.plugin('flowchart').use(MARKDOWN_IT_FLOWCHART);
  },

  /** 插件选项 */
  plugins: pluginConfig(option, ctx)
});
