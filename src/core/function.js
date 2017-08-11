import { struct } from './_structs';
import { Apply } from './context';
import { OBJECT } from './object';

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

export function FUNCTION(fn) {

  return OBJECT({}, FUNCTION_PROTO, struct.Function(fn));
}
