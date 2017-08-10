/**
 * Structures
 */

function define(fields, type) {

  const keys = Object.keys(fields);

  return (defs) => Object.preventExtensions(
    keys.reduce((r, key) => {
      r[ key ] = defs[ key ];
      return r;
    }, Object.assign(Object.create(null), { $$type: type })));
}

export const struct = {

  Tuple: (...initials) => initials,

  Hash: initials => Object.assign(Object.create(null), initials),

  Object: define({
    Props: `Hash<string, PropertyDescriptor>`,
    Proto: `Object`,
    Reflect: `Reflect`,
    Extensible: `boolean`,
    Internal: `*`
  }),

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

  Code: define({
    Steps: '[]Native'
  }),

  Function: define({

    Name: `string`,
    Parameters: `[]string`,
    LocalVariables: `[]string`,
    Code: 'Code',
    // force `this` binding regardless passed at invocation
    BoundToThis: `*`,
    // initialized with current scope at creation
    // to be parent for a new variable scope in Apply()
    LexicalScope: `VariableScope`,
    // prototype instance that used to create an object with `new F()`
    NewPrototype: `Object`
  }),

  Context: define({
    // execution flow
    Result: `*`,
    ExitMode: `string`,
    Index: `int`,

    Fn: `Function`,

    // state
    This: `*`,
    Arguments: `[]*`,
    Scope: `VariableScope`
  }),

  VariableScope: define({
    Vars: `Hash<string, *>`,
    Outer: `VariableScope`
  }),

};