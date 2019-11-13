const { path } = require('@vuepress/shared-utils');

module.exports = options => ({
  name: 'theme-color',

  define: () => ({
    THEME_COLOR_OPTIONS: options || {}
  }),
  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
});
