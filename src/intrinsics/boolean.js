import { FALSE, TRUE, OBJECT, OBJECT_PRIMITIVE, ROOT, FUNCTION } from '../_core.js';

const BooleanPrototype = {

  ValueOf: ($) => $.Internal,

  ToString: ($) => OBJECT_PRIMITIVE($) === TRUE ? 'true' : 'false'

};

export const BooleanConstructor = ($, V) => {

  $.Internal = TRULY(V) ? TRUE : FALSE;
};