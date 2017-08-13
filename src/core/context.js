// ----------------------------------------------
// Context
// ----------------------------------------------

import { struct } from './_structs';
import { UNDEFINED } from './_const';

/**
 * Context
 */

const STACK = [];

export function InitGlobalContext(GlobalObject, Realm) {

  const GlobalContext = struct.Context({

    Scope: struct.VariableScope({ Vars: struct.Hash(GlobalObject) }),

    Realm
  });

  Realm.GlobalObject = GlobalObject;

  Realm.GlobalContext = GlobalContext;

  STACK.unshift(GlobalContext);
}

export function Return(Result = UNDEFINED, Error = UNDEFINED) {

  Object.assign(STACK[ 0 ], { Result, Error, Index: -1 });
}

export function Throw(Error, type) {

  Return(UNDEFINED, Error);
}

export function Apply(Fn, This = null, Arguments = []) {

  // create a new execution context for this invocation
  const context = struct.Context({
    Index: 0,
    Fn,
    This: Fn.BoundToThis || This,
    Arguments,
    Scope: resolveScope(Fn, Arguments),
    Realm: STACK[ 0 ].Realm
  });

  // and push it into execution stack
  STACK.unshift(context);

  // Evaluate binary code
  Fn.Code();

  STACK.shift();

  // to provide context.Result outside
  return context.Result;
}

/**
 * Variable Scope
 */

export function currentScope() {

  return STACK[ 0 ].Scope;
}

function lookupScope(name) {

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

/**
 * Get/Set Variables
 */

// GetVar method
export function GetVar(name) {

  const scope = lookupScope(name);
  if (scope) {
    return scope.Vars[ name ];
  }

  Throw(`variable ${name} is not defined`, ReferenceError);
}

// SetVar method
export function AssignVar(name, V) {

  const scope = lookupScope(name);
  if (scope) {
    scope.Vars[ name ] = V;
    return;
  }

  Throw(`variable ${Id} is not defined`, ReferenceError);
}