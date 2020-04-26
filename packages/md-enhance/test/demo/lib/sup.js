const commonscript = require('./common');

const NAME = 'sup';
const CODE = 0x5e; /* ^ */
const MARKUP = '^';

module.exports = md => {
  md.inline.ruler.after('emphasis', NAME, commonscript(NAME, CODE, MARKUP));
};
