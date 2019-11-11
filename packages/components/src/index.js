const { resolve } = require('path');

module.exports = {
  name: 'components',

  enhanceAppFiles: [resolve(__dirname, 'enhanceAppFile.js')]
};
