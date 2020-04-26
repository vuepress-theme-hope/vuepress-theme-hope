const commonscript = require('./common');

const NAME = 'sub';
const CODE = 0x7e; /* ~ */
const MARKUP = '~';

module.exports = md => {
  md.inline.ruler.after('emphasis', NAME, commonscript(NAME, CODE, MARKUP));
};
