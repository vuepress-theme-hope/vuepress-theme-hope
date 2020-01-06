const { path } = require('@vuepress/shared-utils');

module.exports = options => {
  const config = {
    name: 'comment',

    define: () => ({
      COMMENT_OPTIONS: options || {}
    }),

    enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
  };

  if (options && options.type === 'vssue')
    config.plugins = [['@vssue/vuepress-plugin-vssue', options]];

  return config;
};
