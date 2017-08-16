/**
 * JS internal primitive types.
 * Since JS is dynamically typed, each value must refer to its type.
 */

export const TYPES = {

  UNDEFINED: -1,
  NULL: -2,
  BOOLEAN_FALSE: 0,
  BOOLEAN_TRUE: 1,

  NUMBER: 4,
  INFINITY: 6,
  NOT_A_NUMBER: 7,

  STRING: 8,
  SYMBOL: 9,

  FUNCTION: 10,
  OBJECT: 11,
  ARRAY: 12,
  HASH: 13,
  SET: 14
};