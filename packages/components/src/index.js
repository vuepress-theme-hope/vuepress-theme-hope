const { path } = require('@vuepress/shared-utils');

module.exports = {
  name: 'components',

  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
};
