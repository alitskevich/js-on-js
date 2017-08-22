import { struct } from './_structs';
import { NULL, UNDEFINED } from './_const';

/**
 * Context
 */
const GlobalContext = struct.Context({

  Scope: struct.VariableScope({}),

});

const STACK = [ GlobalContext ];

export function InitGlobalContext(Realm) {

  GlobalContext.Realm = Realm;

  const globalVars = Realm.GlobalObject;

  GlobalContext.Scope.Vars = Object.keys(globalVars).reduce((hash, key) => {

    hash[ key ] = { value: globalVars[ key ] };
    return hash;
  }, struct.Hash());

  Realm.GlobalContext = GlobalContext;

}

export function MakeInternalFunction(initials) {

  return struct.Function({

    // function name
    Name: initials.Name || '',

    // list of parameters names
    Parameters: initials.Parameters || [],

    // list of local variables names
    LocalVariables: initials.LocalVariables || [],

    // list of parameters names
    Code: initials.Code || (() => {
      console.error(`No code for ${initials.Name}`)
    }),

    // list of parameters names
    BoundToThis: initials.BoundToThis || NULL,

    // to be `Outer` for a new variable scope at Apply()
    LexicalScope: STACK[ 0 ].Scope,

    // to be `Proto` for each object constructed with this function by `new` operator
    Prototype: initials.Prototype
  });

}

export function Apply(InternalFn, This = NULL, Arguments = []) {

  // create a new execution context for this invocation
  const context = struct.Context({
    Index: 0,
    Fn: InternalFn,
    This: InternalFn.BoundToThis === NULL ? This : InternalFn.BoundToThis,
    Arguments,
    Scope: resolveScope(InternalFn, Arguments),
    Realm: STACK[ 0 ].Realm
  });

  // and push it into execution stack
  STACK.unshift(context);

  // Evaluate binary code
  InternalFn.Code.apply(This, [ This, ...Arguments ]);

  STACK.shift();

  // to provide context.Result outside
  return context.Return;
}

export function Return(Result = UNDEFINED) {

  STACK[ 0 ].Return = struct.ReturnRecord({ Result });
  STACK[ 0 ].Index = -1;
}

export function Throw(Error = UNDEFINED) {

  STACK[ 0 ].Return = struct.ReturnRecord({ Error });
  STACK[ 0 ].Index = -1;
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
