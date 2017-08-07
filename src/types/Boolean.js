import { FALSE, TRUE, OBJECT, OBJECT_PRIMITIVE, ROOT, FUNCTION } from '../_core.js';

const BOOLEAN_PROTO = OBJECT({

  ValueOf: ($) => $.Subject,

  ToString: ($) => OBJECT_PRIMITIVE($) === TRUE ? 'true' : 'false'

});

export const NewBooleanConstructor = FUNCTION({

  Name: 'Boolean',

  NewPrototype: BOOLEAN_PROTO,

  Code($, V) {

    $.Subject = TRULY(V) ? TRUE : FALSE;
  }
});

export default NewBooleanConstructor;