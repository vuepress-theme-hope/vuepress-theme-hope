// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IAnyObject = Record<any, any>;

const { isArray } = Array;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
const isPlainObject = <T extends IAnyObject = IAnyObject>(
  val: unknown,
): val is T => Object.prototype.toString.call(val) === "[object Object]";

/** Deep merge objects to the first one */
export const deepAssign = <
  T extends IAnyObject,
  U extends IAnyObject = T,
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  V extends Partial<T> & Partial<U> = T & U,
>(
  originObject: T,
  ...overrideObjects: (U | null | undefined)[]
): V => {
  if (overrideObjects.length === 0) return originObject as unknown as V;

  /** Object being merged */
  const assignObject = overrideObjects.shift();

  if (assignObject)
    Object.entries(assignObject).forEach(([property, value]) => {
      if (property === "__proto__" || property === "constructor") return;
      if (isPlainObject(originObject[property]) && isPlainObject(value))
        deepAssign(originObject[property], value);
      else if (isArray(value))
        (originObject as IAnyObject)[property] = [...(value as unknown[])];
      else if (isPlainObject(value))
        (originObject as IAnyObject)[property] = {
          ...value,
        };
      else
        (originObject as IAnyObject)[property] = assignObject[
          property
        ] as unknown;
    });

  return deepAssign(originObject, ...overrideObjects);
};
