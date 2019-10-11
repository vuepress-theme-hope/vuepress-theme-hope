/*
 * @Author: Mr.Hope
 * @Date: 2019-10-09 12:09:44
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-11 23:18:52
 * @Description: 合并对象
 */

/**
 * @description: 复合对象 assignObject无法复写
 * @param {object}  originObject 原生对象
 * @param {object}  assignObject 需要合并的对象
 * @return: 
 */
const assign = (originObject, assignObject) => {
  Object.keys(originObject).forEach(property => {
    if (assignObject[property] === undefined)
      assignObject[property] = originObject[property];
    else if (typeof assignObject[property] === 'object' && !Array.isArray(assignObject))
      assign(originObject[property], assignObject[property]);
  });
};

module.exports = assign;
