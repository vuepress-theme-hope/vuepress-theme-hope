/*
 * @Author: Mr.Hope
 * @Date: 2019-10-20 20:16:34
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-20 20:19:52
 * @Description: markdown-it-sup
 */

const commonscript = require('./common');

const NAME = 'sup';
const CODE = 0x5e; /* ^ */
const MARKUP = '^';

module.exports = md => {
  md.inline.ruler.after('emphasis', NAME, commonscript(NAME, CODE, MARKUP));
};
