import { struct } from './_structs';
import { LookupProperty, ValueProperty } from './object_property';
import { UNDEFINED } from './_const';

export const ORDINARY_OBJECT_REFLECT = struct.Reflect({

  apply($) {
    // THROW
  },

  construct($) {
    // THROW
  },

  defineProperty($, key, prop) {

    $.Props[ key ] = prop
  },

  has($, key) {

    return key in $.Props
  },

  ownKeys($) {

    return Object.keys($.Props)
  },

  getOwnPropertyDescriptor($, key) {

    return $.Props[ key ]
  },

  deleteProperty($, key) {

    delete $.Props
  },

  get($, key) {

    const prop = LookupProperty($, key);

    if (prop) {

      if (prop.Getter) {

        return prop.Getter($);
      }

      return prop.Value;
    }

    return UNDEFINED;
  },

  set($, key, value) {

    const prop = LookupProperty($, key);

    if (prop) {

      // assert(prop.Writable, `property '${key}' is read only`);

      if (prop.Setter) {

        prop.Setter($, key, value);

      }

    } else {

      $.Props[ key ] = ValueProperty(value);
    }
  },

  getPrototypeOf($) {

    return $.Proto
  },

  setPrototypeOf($, value) {

    $.Proto = value;
  },

  isExtensible($) {

    return $.Extensible
  },

  preventExtensions($) {

    $.Extensible = FALSE;
  }
});
