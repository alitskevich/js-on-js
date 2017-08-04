// ----------------------------------------------
// Function
// ----------------------------------------------

import { struct } from './_structs';
import { APPLY } from './context';
import { ROOT_OBJECT } from './object_root';

const FUNCTION_PROTO = struct.Object({

  Meta: struct.Hash(),
  Proto: ROOT_OBJECT,
  Primitive: null,
  Data: struct.Hash({

    Apply: ($, This, ...Arguments) => APPLY($.Primitive, This, Arguments),

    Call: ($, This, ...Arguments) => APPLY($.Primitive, This, Arguments),

    Bind: ($, BoundToThis, ...Arguments) => FUNCTION({

      Code($this, ...args) {

      }
    })
  })
});

export function FUNCTION(fn) {

  return struct.Object({
    Meta: struct.Hash(),
    Data: struct.Hash(),
    Proto: FUNCTION_PROTO,
    Primitive: fn
  });
}

/**
 * Function
 */
export const FunctionConstructor = FUNCTION({

  Code($, parameters, source) {

    $.Primitive = struct.Function({

      Parameters: parameters || [],

      Name: '',

      // to be parent for a new variable scope in Apply()
      LexicalScope: CURRENT_SCOPE(),

      // to be referred as prototype by each object that newly constructed with this function
      NewPrototype: { Constructor: $ }
    });

    // translate($.Primitive, source);
  },

  NewPrototype: FUNCTION_PROTO
});
