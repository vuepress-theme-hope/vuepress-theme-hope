/* eslint-disable indent */
/* eslint-disable no-use-before-define */
/*
 * @Author: Mr.Hope
 * @Date: 2019-10-20 19:02:12
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-08 17:24:55
 * @Description: This file is edited from 'deep-merge'
 */

const isNonNullObject = value => Boolean(value) && typeof value === 'object';

const canUseSymbol = typeof Symbol === 'function' && Symbol.for;
const REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

const isReactElement = value => value.$$typeof === REACT_ELEMENT_TYPE;

const isSpecial = value => {
  const stringValue = Object.prototype.toString.call(value);

  return (
    stringValue === '[object RegExp]' ||
    stringValue === '[object Date]' ||
    isReactElement(value)
  );
};

/** 是否可以合并 */
const isMergeableObject = value => isNonNullObject(value) && !isSpecial(value);

/** 空对象 */
const emptyTarget = value => (Array.isArray(value) ? [] : {});

/** 克隆 */
const clone = (value, options) =>
  options.clone !== false && options.isMergeableObject(value)
    ? deepmerge(emptyTarget(value), value, options)
    : value;

/** 默认函数合并函数 */
const arrayMerge = (target, source, options) =>
  target.concat(source).map(element => clone(element, options));

const getMergeFunction = (key, options) => {
  if (!options.customMerge) return deepmerge;

  const customMerge = options.customMerge(key);
  return typeof customMerge === 'function' ? customMerge : deepmerge;
};

/** 获得 Symbol Key */
const getEnumerableOwnPropertySymbols = target =>
  Object.getOwnPropertySymbols
    ? Object.getOwnPropertySymbols(target).filter(symbol =>
        // eslint-disable-next-line no-prototype-builtins
        target.propertyIsEnumerable(symbol)
      )
    : [];

/** 获得 Keys */
const getKeys = target =>
  Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));

const propertyIsOnObject = (object, property) => {
  try {
    return property in object;
  } catch (err) {
    return false;
  }
};

// Protects from prototype poisoning and unexpected merging up the prototype chain.
const propertyIsUnsafe = (target, key) =>
  propertyIsOnObject(target, key) && // Properties are safe to merge if they don't exist in the target yet,
  // unsafe if they exist up the prototype chain, and also unsafe if they're nonenumerable.
  !(
    Object.hasOwnProperty.call(target, key) &&
    Object.propertyIsEnumerable.call(target, key)
  );

/** 合并对象 */
const mergeObject = (target, source, options) => {
  /** 最终合并的对象 */
  const finalObject = {};

  if (options.isMergeableObject(target))
    getKeys(target).forEach(key => {
      finalObject[key] = clone(target[key], options);
    });

  getKeys(source).forEach(key => {
    if (propertyIsUnsafe(target, key)) return;
    if (
      propertyIsOnObject(target, key) &&
      options.isMergeableObject(source[key])
    )
      finalObject[key] = getMergeFunction(key, options)(
        target[key],
        source[key],
        options
      );
    else finalObject[key] = clone(source[key], options);
  });

  return finalObject;
};

/** 深度合并 */
const deepmerge = (target, source, options) => {
  const finalOptions = {
    arrayMerge,
    isMergeableObject,
    ...options,
    cloneUnlessOtherwiseSpecified: clone
  };

  const sourceIsArray = Array.isArray(source);
  const targetIsArray = Array.isArray(target);
  const sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  if (!sourceAndTargetTypesMatch) return clone(source, finalOptions);

  if (sourceIsArray)
    return finalOptions.arrayMerge(target, source, finalOptions);

  return mergeObject(target, source, finalOptions);
};

/** 全部合并 */
deepmerge.all = (array, options) => {
  if (!Array.isArray(array))
    throw new Error('First argument should be an array');

  return array.reduce((prev, next) => deepmerge(prev, next, options), {});
};

deepmerge.isMergeableObject = isMergeableObject;

module.exports = deepmerge;
