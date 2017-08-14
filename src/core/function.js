import { struct } from './_structs';
import { Apply, currentScope } from './context';
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

export function FUNCTION_STRUCT(fn) {

  return struct.Function({

    Parameters: fn.Parameters || [],

    Name: fn.Name || '',

    // to be parent for a new variable scope in Apply()
    LexicalScope: currentScope(),

    // to be referred as prototype by each object that newly constructed with this function
    Prototype: fn.Prototype || {}
  });

}

export function FUNCTION(fn) {

  const $ = OBJECT({}, FUNCTION_PROTO, FUNCTION_STRUCT(fn));

  $.Internal.Prototype.Constructor = $;

  // translate($.Internal, source);

  return $;
}
