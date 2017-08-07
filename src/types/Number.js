import { ZERO, TYPE_CODES, $Tuple, $Object, $Function, ObjectPrototype, ValueOf, $NaN, $zero } from './_core.js';
import { FALSE, TRUE, OBJECT, OBJECT_PRIMITIVE, ROOT, FUNCTION } from '../_core.js';

const NUMERIC_PROTO = OBJECT({

  ValueOf($) {

    const $p = $.Subject;

    return (TYPE($p) === TYPE_NUMBER ? 1 : -1) * GET($p, 1) * Math.pow(10, GET($p, 2));
  },

  ToString: ($) => '' + ValueOf($)

});

export const NumericConstructor = FUNCTION({

  NewPrototype: NUMERIC_PROTO,

  Code($, sign, fixed, exp) {

    const type = sign === 1 ? TYPE_NUMBER : TYPE_NUMBER_NEGATIVE;

    $.Subject = MAKE(type, sign, fixed, exp);
  }
});
