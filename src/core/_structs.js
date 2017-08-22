/**
 * Structures
 */
import { TYPES } from './_types';

// internal simulation of definition of structures
function define(fields, type = TYPES.INTERNAL) {

  const keys = Object.keys(fields);

  return (defs) => Object.preventExtensions(
    keys.reduce((r, key) => {
      r[ key ] = defs[ key ];
      return r;
    }, Object.assign(Object.create(null), { $$type: type })));
}

export const TYPE = ($) => $.$$type;

export const struct = {

  Hash: initials => Object.assign(Object.create(null), initials),

  Primitive: (type, value) => Object.assign(Object.create(null), { $$type: type, Value: value }),

  Object: define({

    // hashed key/descriptor pairs that constitute object state
    Props: `Hash<string, PropertyDescriptor>`,

    // reference to prototype object that used for chaining when lookup props by key if no own exists.
    Proto: `Object`,

    // set of methods to access to the object instance. May be changed for objects like Proxy.
    Reflect: `Reflect`,

    // flag to set if object is able to add new keys
    Extensible: `boolean`,

    // May refer to specific structures used for `exotic` objects like Function, Array, Number etc
    Internal: `*`

  }, TYPES.OBJECT),

  Array: define({
    Items: `Hash<int, *>`,
    Length: `int`
  }, TYPES.ARRAY),

  Function: define({

    // Signature
    Name: `string`,
    Parameters: `[]string`,

    // list of local variables names
    LocalVariables: `[]string`,

    // native instructions to be evaluate at Apply()
    Code: 'native',

    // `this` binding in favor of passed at invocation
    BoundToThis: `*`,

    // initialized with current scope at creation
    // to be parent for a new variable scope at Apply()
    LexicalScope: `VariableScope`,

    // prototype instance that used to create an object with `new F()`
    Prototype: `Object`

  }, TYPES.FUNCTION),

  Reflect: define({

    apply: `Function`,
    construct: `Function`,

    defineProperty: `Function`,
    has: `Function`,
    ownKeys: `Function`,
    getOwnPropertyDescriptor: `Function`,
    deleteProperty: `Function`,

    get: `Function`,
    set: `Function`,

    getPrototypeOf: `Function`,
    setPrototypeOf: `Function`,

    isExtensible: `Function`,
    preventExtensions: `Function`

  }),

  PropertyDescriptor: define({

    // for accessor property:
    Getter: `Function`,
    Setter: `Function`,

    // for data property:
    Value: `*`,
    Writable: `boolean`,

    // commons:
    Enumerable: `boolean`,
    Configurable: `boolean`
  }),

  Error: define({
    Message: `string`,
    Stack: `*`,
    Position: `*`,
  }),

  ReturnRecord: define({

    // result value returned
    Result: `*`,

    // error instance if one thrown
    Error: `Error`,
  }),

  Context: define({

    // execution flow
    Return: `ReturnRecord`,
    Index: `int`,
    Fn: `Function`,

    // state
    This: `*`,
    Arguments: `[]*`,
    Scope: `VariableScope`,
    Realm: `Realm`
  }),

  VariableScope: define({

    // hash with variable name/value bindings
    Vars: `Hash<string, *>`,

    // used for chaining when resolve variable by name if no own exists
    // initialized with function lexical scope at Apply()
    Outer: `VariableScope`
  }),

  Realm: define({
    Intrinsics: `Hash<string, Function>`,
    GlobalObject: `Object`,
    GlobalContext: `Context`,
    TemplateMap: `*`,
    HostDefined: `*`,
  }),

};
