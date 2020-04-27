module.exports = {
  '*.vue': ['eslint --fix'],
  '*.{js,ts,md}': ['prettier --write', 'eslint --fix']
};
