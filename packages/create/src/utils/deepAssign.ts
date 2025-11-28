// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IAnyObject = Record<any, any>;

const { isArray } = Array;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
const isPlainObject = <InferredType extends IAnyObject = IAnyObject>(
  val: unknown,
): val is InferredType =>
  Object.prototype.toString.call(val) === "[object Object]";

/** Deep merge objects to the first one */
export const deepAssign = <
  TargetObject extends IAnyObject,
  MergedObject extends IAnyObject = TargetObject,
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  FinalObject extends Partial<TargetObject> & Partial<MergedObject> =
    TargetObject & MergedObject,
>(
  originObject: TargetObject,
  ...overrideObjects: (MergedObject | null | undefined)[]
): FinalObject => {
  if (overrideObjects.length === 0)
    return originObject as unknown as FinalObject;

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
