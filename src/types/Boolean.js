import { FALSE, TRUE, OBJECT, OBJECT_PRIMITIVE, ROOT, FUNCTION } from '../_core.js';

const BOOLEAN_PROTO = OBJECT({

  ValueOf: ($) => $.Primitive,

  ToString: ($) => OBJECT_PRIMITIVE($) === TRUE ? 'true' : 'false'

});

export const BooleanConstructor = FUNCTION({

  Name: 'Boolean',

  NewPrototype: BOOLEAN_PROTO,

  Code($, V) {

    $.Primitive = TRULY(V) ? TRUE : FALSE;
  }
});
