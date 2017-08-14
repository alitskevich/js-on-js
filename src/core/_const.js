import TYPE from './_types';

/**
 * JS introduces quadruple logic:
 * if you choose from duality there are actually four results possible:
 *  yes - certain unambiguous positive choice
 *  no - certain unambiguous negative choice
 *  nothing - certain empty choice
 *  any - uncertain choice(includes all choices)
 *
 */

// UNCERTAIN - ANYTHING POSSIBLE
export const UNDEFINED = { $$type: TYPE.UNDEFINED };

// CERTAINLY NOTHING
export const NULL = { $$type: TYPE.NULL };

// Positive dual choice
export const TRUE = { $$type: TYPE.BOOLEAN_TRUE };

// Negative dual choice
export const FALSE = { $$type: TYPE.BOOLEAN_FALSE };

/**
 * Special numbers constants
 */

// Non-equal to anything including itself
export const ZERO = { $$type: TYPE.NUMBER_ZERO, Internal: 0 };

// Non-equal to anything including itself
export const NOT_A_NUMBER = { $$type: TYPE.NOT_A_NUMBER };

// More then any other number
export const INFINITY = { $$type: TYPE.INFINITY };

/**
 * Empty string constant
 */

// Empty string
export const STRING_EMPTY = { $$type: TYPE.STRING_EMPTY, Internal: '' };
