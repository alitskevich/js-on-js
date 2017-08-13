/**
 * String.
 *
 */
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