/**
 * Structures
 */
import { TYPES } from './_types';

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

  Primitive: (type, value) => Object.assign(Object.create(null), { $$type: type, $$value: value }),

  Object: define({
    Props: `Hash<string, PropertyDescriptor>`,
    Proto: `Object`,
    Reflect: `Reflect`,
    Extensible: `boolean`,
    Internal: `*`
  }, TYPES.OBJECT),

  Array: define({
    Items: `Hash<string, *>`,
    Length: `int`
  }, TYPES.ARRAY),

  Function: define({

    Name: `string`,
    Parameters: `[]string`,
    LocalVariables: `[]string`,
    Code: 'native',
    // force `this` binding regardless passed at invocation
    BoundToThis: `*`,
    // initialized with current scope at creation
    // to be parent for a new variable scope in Apply()
    // prototype instance that used to create an object with `new F()`
    LexicalScope: `VariableScope`,
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

  ReturnRecord: define({
    // execution flow
    Result: `*`,
    Mode: `string`,
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
    Vars: `Hash<string, *>`,
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
