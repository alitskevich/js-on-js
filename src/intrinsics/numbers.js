/**
 * Special numbers constants
 */

import { struct, TYPE } from '../core/_structs';
import { TYPES } from '../core/_types';

// Non-equal to anything including itself
export const NOT_A_NUMBER = struct.Primitive(TYPES.NOT_A_NUMBER);

// More then any other number
export const INFINITY = struct.Primitive(TYPES.INFINITY);

export const IsNumber = (a) => TYPE($) === TYPES.NUMBER;

export const ToNumber = ($) => {

  return 0 + $;
};

// The initial value of the  prototype property of %Number%
export const NumberPrototype = {

  ValueOf($) {

    const $p = $.Internal;

    return (TYPE($p) === TYPE_NUMBER ? 1 : -1) * GET($p, 1) * Math.pow(10, GET($p, 2));
  },

  ToString: ($, redix) => '' + ValueOf($),

  ToExponential: ($, fractionalDigits) => ValueOf($),

  ToFixed: ($, fractionalDigits) => ValueOf($),

  ToPrecision: ($, fractionalDigits) => ValueOf($),

}

// The Number constructor
export const NumberConstructor = ($, sign, fixed, exp) => {

  const type = sign === 1 ? TYPE_NUMBER : TYPE_NUMBER_NEGATIVE;

  $.Internal = MAKE(type, sign, fixed, exp);
}

/**
 *
 Properties
 Math.E
 Math.LN10
 Math.LN2
 Math.LOG10E
 Math.LOG2E
 Math.PI
 Math.SQRT1_2
 Math.SQRT2

 Methods
 Math.abs()
 Math.acos()
 Math.acosh()
 Math.asin()
 Math.asinh()
 Math.atan()
 Math.atan2()
 Math.atanh()
 Math.cbrt()
 Math.ceil()
 Math.clz32()
 Math.cos()
 Math.cosh()
 Math.exp()
 Math.expm1()
 Math.floor()
 Math.fround()
 Math.hypot()
 Math.imul()
 Math.log()
 Math.log10()
 Math.log1p()
 Math.log2()
 Math.max()
 Math.min()
 Math.pow()
 Math.random()
 Math.round()
 Math.sign()
 Math.sin()
 Math.sinh()
 Math.sqrt()
 Math.tan()
 Math.tanh()
 Math.trunc()
 */
export const MathObject = Math;