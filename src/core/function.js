// ----------------------------------------------
// Function
// ----------------------------------------------

import { OBJECT } from './object';
import { struct } from '../impl';

const FUNCTION_PROTOTYPE = OBJECT({

  Apply: ($, This, Arguments) => FUNCTION_APPLY($.Primitive, This, Arguments),

  Call: ($, This, ...Arguments) => FUNCTION_APPLY($.Primitive, This, Arguments),

  Bind: ($, BoundToThis, ...Arguments) => FUNCTION({

    Code($this, ...args) {

    }
  })
});

export function FUNCTION(fn, initials = {}) {

  return OBJECT(initials, FUNCTION_PROTOTYPE, struct.Function(fn));
}

/**
 * Function
 */
export const FunctionConstructor = FUNCTION({

  Code($, parameters, source, name) {

    $.Primitive = struct.Function({
      Parameters: parameters || [],
      Name: name || '',
      // to be parent for a new variable scope in Apply()
      LexicalScope: Context.variableScope,
      // to be referred as prototype by each object that newly constructed with this function
      NewPrototype: OBJECT({ Constructor: $ })
    })

    translate($.Primitive, source);
  },

  NewPrototype: FUNCTION_PROTOTYPE
});
