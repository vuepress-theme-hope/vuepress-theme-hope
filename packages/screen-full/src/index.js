const { path } = require('@vuepress/shared-utils');

module.exports = {
  name: 'screen-full',

  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
};
