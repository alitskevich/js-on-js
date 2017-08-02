// ----------------------------------------------
// Context
// ----------------------------------------------

import { NULL } from '../impl/_const';
import { struct } from '../impl/structs.js';
import { MAP } from '../impl/map';
import { SIZE } from '../impl/alloc';
import { FOR_EACH } from '../impl/commons';

/**
 * Context
 */
const GLOBAL = struct.Context({
  Next: NULL,
  VariableScope: struct.VariableScope({ Parent: NULL, Data: MAP() })
});

let Context = GLOBAL;

export function CURRENT_CONTEXT() {

  return Context;
}

export function POP_CONTEXT() {

  const context = Context.Next;

  Context = context;

  return context
}

export function PUSH_CONTEXT(Fn, This, Arguments) {

  let VariableScope = Context.VariableScope;

  if (SIZE(Fn.Parameters) + SIZE(Fn.LocalVariables)) {
    const Data = MAP();
    // put parameters into scope
    FOR_EACH(Fn.Parameters, Id => {
      MAP_SET(Data, Id, UNDEFINED);
    });
    // define all variables BEFORE any execution, e.g. Hoisting
    FOR_EACH(Fn.LocalVariables, Id => {
      MAP_SET(Data, Id, UNDEFINED);
    });
    // create a new variable scope exclosed by this function lexical scope
    VariableScope = struct.VariableScope({ Parent: Fn.LexicalScope, Data });
  }

  // create a new execution context for this invocation
  // and push it into execution stack
  const context = struct.Context({
    Next: Context,
    Fn,
    This: Fn.BoundToThis || This,
    Arguments,
    VariableScope
  });

  Context = context;

  return context;
}
