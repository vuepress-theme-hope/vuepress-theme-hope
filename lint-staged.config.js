module.exports = {
  "*.vue": ["eslint --fix"],
  "*.{js,ts}": ["prettier --write", "eslint --fix"],
  "*.{md,json}": ["prettier --write"],
};
