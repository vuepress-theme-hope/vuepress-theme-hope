import { isArray, isPlainObject } from "@vuepress/shared";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IAnyObject = Record<string, any>;

/** Deep merge objects to the first one */
export const deepMerge = <
  T extends IAnyObject,
  U extends IAnyObject = T,
  V extends Partial<T> & Partial<U> = T & U
>(
  originObject: T,
  ...overrideObjects: U[]
): V => {
  if (overrideObjects.length === 0) return originObject as unknown as V;

  /** Object being merged */
  const assignObject = (overrideObjects.shift() as IAnyObject) || {};

  Object.keys(assignObject).forEach((property) => {
    if (
      isPlainObject(originObject[property]) &&
      !isArray(originObject[property]) &&
      isPlainObject(assignObject[property]) &&
      !isArray(assignObject[property])
    )
      deepMerge(originObject[property], assignObject[property]);
    else if (isPlainObject(assignObject[property]))
      if (isArray(assignObject[property]))
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

  return deepMerge(originObject, ...overrideObjects);
};
