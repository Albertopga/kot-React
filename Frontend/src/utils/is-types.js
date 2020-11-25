import { isArray, isInteger, isPlainObject } from "lodash";

/**
 * returns true if `x` is a finite Integer
 * @param {any} x
 * @return {boolean}
 */
export function isFiniteInteger(x) {
  return isInteger(x) && isFinite(x);
}

/**
 * returns true if `x` is a finite Integer and it is >= 0
 * @param {any} x
 * @return {boolean}
 */
export function isPositiveFiniteInteger(x) {
  return isFiniteInteger(x) && x >= 0;
}

/**
 * returns true if `x` is an array of PlainObject
 * @param {any} x
 * @return {boolean}
 */
export function isArrayOfPlainObjects(x) {
  if (!x || !isArray(x)) return false;
  return x.length > 0 ? isPlainObject(x[0]) : true;
}
