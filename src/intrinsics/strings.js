/**
 * String.
 *
 */
import { TYPES } from '../core/_types';
import { struct } from '../core/_structs';

// Empty string
export const STRING_EMPTY = struct.Primitive(TYPES.STRING, 0);

export const ToString = ($) => {

  return '' + $;
};

export const StringPrototype = {

  ToString: ($) => $

};

export const StringConstructor = ($, chars) => {

  $.Internal = struct.Primitive(TYPES.STRING, chars);
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