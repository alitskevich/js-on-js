import { struct } from './_structs';
import { Apply } from './context';
import { OBJECT } from './object';
import { ORDINARY_OBJECT_REFLECT } from './object_reflect';

// ----------------------------------------------
// Function
// ----------------------------------------------

export const FUNCTION_PROTO = OBJECT({

  Length: struct.PropertyDescriptor({
    Get: ($) => $.Internal.Parameters.length
  }),

  Apply: ($, This, Arguments) => Apply($.Internal, This, Arguments),

  Call: ($, This, ...Arguments) => Apply($.Internal, This, Arguments),

  Bind: ($, BoundToThis, ...Arguments) => FUNCTION({

    Code($this, ...args) {
      // todo
    }
  })
});

const FUNCTION_REFLECT = {

  ...ORDINARY_OBJECT_REFLECT,

  apply(Fn, This, Arguments) {

    return Apply(Fn.Internal, This, Arguments);
  },

  construct($, ...args) {

    const $new = OBJECT({}, $.Internal.NewPrototype);

    Apply($.Internal, $new, args);

    return $new;
  },

};

export function FUNCTION(fn) {

  return OBJECT({}, FUNCTION_PROTO, struct.Function(fn), FUNCTION_REFLECT);
}
