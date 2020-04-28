type IAnyObject = Record<string, any>;

/**
 * 深度合并对象，合并到第一个
 *
 * @param originObject 原生对象
 * @param assignObjects 需要合并的对象
 */
export const deepAssign = <
  T extends IAnyObject,
  U extends IAnyObject = T,
  V extends IAnyObject = T
>(
  originObject: T,
  ...assignObjects: U[]
): V => {
  if (assignObjects.length === 0) return originObject as V;

  /** 本次合并的对象 */
  const assignObject = assignObjects.shift() as IAnyObject;

  Object.keys(assignObject).forEach((property) => {
    if (
      typeof originObject[property] === 'object' &&
      !Array.isArray(originObject[property]) &&
      typeof assignObject[property] === 'object' &&
      !Array.isArray(assignObject[property])
    )
      deepAssign(originObject[property], assignObject[property]);
    else if (typeof assignObject[property] === 'object')
      if (Array.isArray(assignObject[property]))
        (originObject as Record<string, any>)[property] = [
          ...assignObject[property]
        ];
      else
        (originObject as Record<string, any>)[property] = {
          ...assignObject[property]
        };
    else
      (originObject as Record<string, any>)[property] = assignObject[property];
  });

  return deepAssign(originObject, ...assignObjects);
};

/**
 * 深度合并对象，合并到最后一个
 *
 * @param assignObjects 需要合并的对象
 */
export const deepAssignReverse = (
  ...assignObjects: IAnyObject[]
): IAnyObject => {
  if (assignObjects.length === 0) throw new Error('No param is given');
  if (assignObjects.length === 1) return assignObjects[0];

  /** 需要合并的对象 */
  const assignObject = assignObjects.pop() as IAnyObject;
  /** 被合并的对象 */
  const originObject = assignObjects.pop() as IAnyObject;

  Object.keys(originObject).forEach((property) => {
    if (assignObject[property] === undefined)
      if (typeof originObject[property] === 'object')
        if (Array.isArray(originObject[property]))
          assignObject[property] = [...originObject[property]];
        else assignObject[property] = { ...originObject[property] };
      else assignObject[property] = originObject[property];
    else if (
      typeof assignObject[property] === 'object' &&
      !Array.isArray(assignObject) &&
      typeof originObject[property] === 'object' &&
      !Array.isArray(originObject[property])
    )
      deepAssignReverse(originObject[property], assignObject[property]);
  });

  return deepAssignReverse(...assignObjects, assignObject);
};
