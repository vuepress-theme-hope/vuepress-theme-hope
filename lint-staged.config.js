module.exports = {
  '*.vue': ['eslint --fix'],
  '*.{js,ts,md,json}': ['prettier --write', 'eslint --fix']
};
