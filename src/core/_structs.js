/**
 * Structures
 */

function define(fields) {

  const keys = Object.keys(fields);

  return (defs) => keys.reduce((r, key) => {
    r[ key ] = defs[ key ];
    return r;
  }, Object.create(null));
}

export const struct = {

  Tuple: (...initials) => initials,

  Hash: initials => Object.assign(Object.create(null), initials),

  Object: define({
    Meta: `Hash<string, PropertyDescriptor>`,
    Data: `Hash<string, *>`,
    Proto: `Object`,
    Subject: `*`
  }),

  PropertyDescriptor: define({
    Getter: `Function`,
    Setter: `Function`,
    IsEnumerable: `boolean`,
    IsConfigurable: `boolean`
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
    Exit: `*`,
    Index: `int`,

    Fn: `Function`,

    This: `*`,
    Arguments: `[]*`,
    VariableScope: `VariableScope`
  }),

  VariableScope: define({
    Data: `Hash<string, *>`,
    Parent: `VariableScope`
  }),

};