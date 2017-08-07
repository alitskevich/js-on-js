import { struct } from './_structs';
import { APPLY } from './context';
import { ROOT_OBJECT } from './object_root';
import { NULL } from './globals';

// ----------------------------------------------
// Function
// ----------------------------------------------

export const FUNCTION_PROTO = struct.Object({

  Meta: struct.Hash({
    Length: struct.PropertyDescriptor({
      Get: ($) => $.Subject.Parameters.length
    })
  }),

  Proto: ROOT_OBJECT,

  Subject: NULL,

  Data: struct.Hash({

    Apply: ($, This, ...Arguments) => APPLY($.Subject, This, Arguments),

    Call: ($, This, ...Arguments) => APPLY($.Subject, This, Arguments),

    Bind: ($, BoundToThis, ...Arguments) => FUNCTION({

      Code($this, ...args) {
        // todo
      }
    })
  })
});

export function FUNCTION(fnStruct) {

  return struct.Object({

    Meta: struct.Hash(),
    Data: struct.Hash(),
    Proto: FUNCTION_PROTO,
    Subject: fnStruct
  });
}
