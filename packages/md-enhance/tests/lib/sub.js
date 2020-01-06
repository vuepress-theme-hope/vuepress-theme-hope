/*
 * @Author: Mr.Hope
 * @Date: 2019-10-20 20:16:34
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-20 20:20:34
 * @Description: markdown-it-sub
 */

const commonscript = require('./common');

const NAME = 'sub';
const CODE = 0x7e; /* ~ */
const MARKUP = '~';

module.exports = md => {
  md.inline.ruler.after('emphasis', NAME, commonscript(NAME, CODE, MARKUP));
};
