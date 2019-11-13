const { path } = require('@vuepress/shared-utils');

module.exports = {
  name: 'back-to-top',

  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),

  globalUIComponents: 'BackToTop'
};
