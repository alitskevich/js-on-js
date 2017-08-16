/**
 * String.
 *
 */

// Empty string
export const STRING_EMPTY = struct.Primitive(TYPE.STRING_EMPTY, 0);

export const StringPrototype = {

  ToString: ($) => $

};

export const StringConstructor = ($, chars) => {

  $.Internal = (chars);
};

/**
 * RegExp.
 *
 */
export const RegExp = RegExp;

/**
 * Symbol.
 *
 */
export const Symbol = Symbol;