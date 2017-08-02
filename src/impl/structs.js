/**
 * Structures
 */
import { TYPE_ANY, TYPE_OBJECT, TYPE_FUNCTION } from './_const';
import { MAKE, GET, SET } from './alloc';

export function struct(id, type, fields) {

  const keys = Object.keys(fields);
  const proto = keys.reduce((o, key, index) => {
    Object.defineProperty(o, key, {
      get() {
        return GET(this.$, index)
      },
      set(V) {
        SET(this.$, index, V)
      }
    });
    return o;
  }, {});

  struct[ id ] = (defs) => Object.assign(Object.create(proto),
    { $: MAKE(type, ...keys.map((key, index) => defs[ key ] || 0)) }
  );
}

/**
 * Struct.
 */
struct(`Context`, TYPE_ANY, {

  Result: `Any`,
  Exit: `Any`,

  Next: `Context`,
  Fn: `Function`,
  This: `Any`,
  Arguments: `[]Any`,
  VariableScope: `VariableScope`
});

struct(`VariableScope`, TYPE_ANY, {
  Data: `Map<String, Any>`,
  Parent: `VariableScope`
});

struct(`Object`, TYPE_OBJECT, {
  Meta: `Map<String, PropertyDecriptor>`,
  Data: `Map<String, Any>`,
  Proto: `Object`,
  Primitive: `Any`
});

struct(`PropertyDescriptor`, TYPE_ANY, {
  Getter: `Function`,
  Setter: `Function`,
  IsEnumerable: `Boolean`,
  IsConfigurable: `Boolean`
});

struct(`Function`, TYPE_FUNCTION, {
  Name: `String`,
  Parameters: `[]String`,
  LocalVariables: `[]String`,
  Code: 'Statement',
  // force `this` binding regardless passed at invocation
  BoundToThis: `Any`,
  // initialized with current scope at creation
  // to be parent for a new variable scope in Apply()
  LexicalScope: `VariableScope`,
  // prototype instance that used to create an object with `new F()`
  NewPrototype: `Object`
});
