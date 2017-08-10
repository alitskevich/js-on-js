// ----------------------------------------------
// Context
// ----------------------------------------------

import { struct } from './_structs';
import { UNDEFINED } from './_const';

/**
 * Context
 */
const GLOBAL = struct.Context({

  Scope: struct.VariableScope({ Vars: struct.Hash() })
});

const STACK = [ GLOBAL ];

export function Exit(Result, Error) {

  Object.assign(STACK[ 0 ], { Result, Error, Index: -1 });
}

export function Apply(Fn, This = null, Arguments = []) {

  // create a new execution context for this invocation
  const context = struct.Context({
    Index: 0,
    Fn,
    This: Fn.BoundToThis || This,
    Arguments,
    Scope: resolveScope(Fn, Arguments)
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

export function currentScope() {

  return STACK[ 0 ].Scope;
}

export function lookupScope(name) {

  for (let scope = currentScope(); scope; scope = scope.Outer) {
    if (name in scope.Vars) {
      return scope;
    }
  }
}

// creates and pushes a new Context for given function
function resolveScope(Fn, Arguments) {

  if (Fn.Parameters.length === 0 && Fn.LocalVariables.length === 0) {
    return currentScope();
  }

  const Vars = struct.Hash();

  // put parameters into scope
  Fn.Parameters.forEach((name, index) => {
    Vars[ name ] = Arguments[ index ] || UNDEFINED;
  });

  // define all variables BEFORE any execution, e.g. Hoisting
  Fn.LocalVariables.forEach((name, index) => {
    Vars[ name ] = UNDEFINED;
  });

  // create a new variable scope on the function lexical scope
  return struct.VariableScope({
    Outer: Fn.LexicalScope,
    Vars
  });
}
