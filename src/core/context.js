// ----------------------------------------------
// Context
// ----------------------------------------------

import { struct } from './_structs';
import { UNDEFINED } from './globals';

/**
 * Context
 */
const GLOBAL = struct.Context({

  VariableScope: struct.VariableScope({ Parent: null, Data: Object.create(null) })
});

const STACK = [ GLOBAL ];

export function CURRENT_SCOPE() {

  return STACK[ 0 ].VariableScope;
}

export function EXIT(Result, Error) {

  Object.assign(STACK[ 0 ], { Result, Error, Index: -1 });
}

export function APPLY(Fn, This = null, Arguments = []) {

  // create a new execution context for this invocation
  const context = struct.Context({
    Index: 0,
    Fn,
    This: Fn.BoundToThis || This,
    Arguments,
    VariableScope: resolveScope(Fn, Arguments)
  });

  // and push it into execution stack
  STACK.unshift(context);

  // Evaluate binary code
  Fn.Code();

  STACK.shift();

  // to provide context.Result outside
  return context.Result;
}

// --------

export function LOOKUP_SCOPE(name) {

  for (let scope = CURRENT_SCOPE(); scope; scope = scope.Parent) {
    if (name in scope.Data) {
      return scope;
    }
  }
}

// creates and pushes a new Context for given function
function resolveScope(Fn, Arguments) {

  if (Fn.Parameters.length === 0 && Fn.LocalVariables.length === 0) {
    return CURRENT_SCOPE();
  }

  const Data = struct.Hash();

  // put parameters into scope
  Fn.Parameters.forEach((name, index) => {
    Data[ name ] = Arguments[ index ] || UNDEFINED;
  });

  // define all variables BEFORE any execution, e.g. Hoisting
  Fn.LocalVariables.forEach((name, index) => {
    Data[ name ] = UNDEFINED;
  });

  // create a new variable scope on the function lexical scope
  return struct.VariableScope({
    Parent: Fn.LexicalScope,
    Data
  });
}
