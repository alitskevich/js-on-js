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

export function Return(Error = UNDEFINED, Result = UNDEFINED) {

  STACK[ 0 ].Return = struct.ReturnRecord({ Error, Result });
  STACK[ 0 ].Index = -1;
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
  return context.Return;
}

/**
 * Variable Scope
 */

export function lookupVar(name) {

  for (let scope = STACK[ 0 ].Scope; scope; scope = scope.Outer) {
    if (name in scope.Vars) {
      return scope.Vars[ name ];
    }
  }

  return UNDEFINED;
}

// creates and pushes a new Context for given function
function resolveScope(Fn, Arguments) {

  if (Fn.Parameters.length === 0 && Fn.LocalVariables.length === 0) {
    return STACK[ 0 ].Scope;
  }

  const Vars = struct.Hash();

  // put parameters into scope
  Fn.Parameters.forEach((name, index) => {
    Vars[ name ] = { value: Arguments[ index ] || UNDEFINED };
  });

  // define all variables BEFORE any execution, e.g. Hoisting
  Fn.LocalVariables.forEach((name, index) => {
    Vars[ name ] = { value: UNDEFINED };
  });

  // create a new variable scope on the function lexical scope
  return struct.VariableScope({
    Outer: Fn.LexicalScope,
    Vars
  });
}

// ----------------------------------------------
// Function
// ----------------------------------------------

export function FunctionInternal(initials) {

  return struct.Function({

    Parameters: initials.Parameters || [],

    Name: initials.Name || '',

    // to be parent for a new variable scope in Apply()
    LexicalScope: STACK[ 0 ].Scope,

    // to be referred as prototype by each object that newly constructed with this function
    Prototype: initials.Prototype || {}
  });

}