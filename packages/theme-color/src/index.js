const { resolve } = require('path');

module.exports = options => ({
  name: 'theme-color',

  define: () => ({
    THEME_COLOR_OPTIONS: options || {}
  }),
  enhanceAppFiles: [resolve(__dirname, 'enhanceAppFile.js')]
});
