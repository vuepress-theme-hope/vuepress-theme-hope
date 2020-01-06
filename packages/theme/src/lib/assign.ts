/*
 * @Author: Mr.Hope
 * @Date: 2019-10-09 12:09:44
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-01 22:44:11
 * @Description: 合并对象
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IAnyObject=Record<string, any>;

/**
 * 深度合并对象，合并到第一个
 *
 * @param originObject 原生对象
 * @param assignObjects 需要合并的对象
 */
export const deepAssign = (
  originObject: IAnyObject,
  ...assignObjects: IAnyObject[]
): void => {
  if (assignObjects.length === 0) return;

  /** 本次合并的对象 */
  const assignObject = assignObjects.shift() as IAnyObject;

  Object.keys(assignObject).forEach(property => {
    if (
      typeof originObject[property] === 'object' &&
      !Array.isArray(originObject[property]) &&
      typeof assignObject[property] === 'object' &&
      !Array.isArray(assignObject[property])
    )
      deepAssign(originObject[property], assignObject[property]);
    else originObject[property] = assignObject[property];
  });

  deepAssign(originObject, ...assignObjects);
};

/**
 * 深度合并对象，合并到最后一个
 *
 * @param assignObjects 需要合并的对象
 */
export const deepAssignReverse = (...assignObjects: IAnyObject[]): void=> {
  if (assignObjects.length === 1 || assignObjects.length === 0) return;

  /** 需要合并的对象 */
  const assignObject = assignObjects.pop()as IAnyObject;
  /** 被合并的对象 */
  const originObject = assignObjects.pop() as IAnyObject;

  Object.keys(originObject).forEach(property => {
    if (assignObject[property] === undefined)
      assignObject[property] = originObject[property];
    else if (
      typeof assignObject[property] === 'object' &&
      !Array.isArray(assignObject)
    )
      deepAssignReverse(originObject[property], assignObject[property]);
  });

  deepAssignReverse(...assignObjects, assignObject);
};
