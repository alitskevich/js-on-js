/**
 * JS types codes.
 * Since JS is dynamically typed, each value must implicitly refer to its type.
 */

export const TYPES = {

  // logical
  UNDEFINED: -1,
  NULL: -2,
  BOOLEAN_FALSE: 0,
  BOOLEAN_TRUE: 1,

  // numeric
  NUMBER: 4,
  INFINITY: 6,
  NOT_A_NUMBER: 7,

  // textual
  STRING: 8,
  SYMBOL: 9,

  // compound
  OBJECT: 10,
  ARRAY: 11,
  HASH: 12,
  SET: 13,

  // functional
  FUNCTION: 14,

  // internal
  PROPERTY: 15,
  INTERNAL: 16

};