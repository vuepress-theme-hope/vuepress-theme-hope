const { resolve } = require('path');

module.exports = {
  name: 'back-to-top',

  enhanceAppFiles: [resolve(__dirname, 'enhanceAppFile.js')],

  globalUIComponents: 'BackToTop'
};
