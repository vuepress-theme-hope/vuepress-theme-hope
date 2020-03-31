module.exports = {
  '*.vue': ['eslint --fix'],
  '*.{js,ts}': ['prettier --write', 'eslint --fix']
};
