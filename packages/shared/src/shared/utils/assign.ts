// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IAnyObject = Record<string, any>;

/** Deep merge objects to the first one */
export const deepAssign = <
  T extends IAnyObject,
  U extends IAnyObject = T,
  V extends IAnyObject = T
>(
  originObject: T,
  ...assignObjects: U[]
): V => {
  if (assignObjects.length === 0) return originObject as V;

  /** Object being merged */
  const assignObject = (assignObjects.shift() as IAnyObject) || {};

  Object.keys(assignObject).forEach((property) => {
    if (
      typeof originObject[property] === "object" &&
      !Array.isArray(originObject[property]) &&
      typeof assignObject[property] === "object" &&
      !Array.isArray(assignObject[property])
    )
      deepAssign(originObject[property], assignObject[property]);
    else if (typeof assignObject[property] === "object")
      if (Array.isArray(assignObject[property]))
        (originObject as IAnyObject)[property] = [
          ...(assignObject[property] as unknown[]),
        ];
      else
        (originObject as IAnyObject)[property] = {
          ...(assignObject[property] as Record<string, unknown>),
        };
    else
      (originObject as IAnyObject)[property] = assignObject[
        property
      ] as unknown;
  });

  return deepAssign(originObject, ...assignObjects);
};

/** Deep merge objects to the last one */
export const deepAssignReverse = (
  ...assignObjects: IAnyObject[]
): IAnyObject => {
  if (assignObjects.length === 0) throw new Error("No param is given");
  if (assignObjects.length === 1) return assignObjects[0];

  const assignObject = assignObjects.pop() as IAnyObject;
  const originObject = assignObjects.pop() as IAnyObject;

  Object.keys(originObject).forEach((property) => {
    if (assignObject[property] === undefined)
      if (typeof originObject[property] === "object")
        if (Array.isArray(originObject[property]))
          assignObject[property] = [...(originObject[property] as unknown[])];
        else
          assignObject[property] = {
            ...(originObject[property] as Record<string, unknown>),
          };
      else assignObject[property] = originObject[property] as unknown;
    else if (
      typeof assignObject[property] === "object" &&
      !Array.isArray(assignObject) &&
      typeof originObject[property] === "object" &&
      !Array.isArray(originObject[property])
    )
      deepAssignReverse(
        originObject[property] as IAnyObject,
        assignObject[property] as IAnyObject
      );
  });

  return deepAssignReverse(...assignObjects, assignObject);
};
