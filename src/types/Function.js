/**
 * Function
 */
import { FUNCTION, FUNCTION_PROTO } from '../core/function';
import { struct } from '../core/_structs';
import { currentScope } from '../core/context';

export const FunctionConstructor = FUNCTION({

  Code($, parameters, source) {

    $.Subject = struct.Function({

      Parameters: parameters || [],

      Name: '',

      // to be parent for a new variable scope in Apply()
      LexicalScope: currentScope(),

      // to be referred as prototype by each object that newly constructed with this function
      NewPrototype: { Constructor: $ }
    });

    // translate($.Subject, source);
  },

  NewPrototype: FUNCTION_PROTO
});
