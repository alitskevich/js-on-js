import { struct } from './_structs.js';
import { LookupProperty, PROTO_PROPERTY, DefineProperty, PROPERTIES } from './object_property';
import { FALSE, TRUE, UNDEFINED, NULL } from './_const';

/**
 * This is the default root object in a prototype tree.
 *
 * '''
 *  obj = new Object();
 *  obj.__proto__
 * '''
 */
export const ROOT = {

  // no proto for root!
  Proto: NULL,

  // contains common methods, available for all descendants
  Props: PROPERTIES({

    // despite root itself has no proto,
    // `__Proto__` property will be useful for its descendants
    __Proto__: PROTO_PROPERTY,

    // returns underlying primitive structure
    ValueOf($) {

      return $.Internal;
    },

    ToString($) {

      return `[object ${$.__Proto__.Constructor.Name}]`
    },

    ToLocaleString($) {

      return $.Reflect.get($, `ToString`).apply($)
    },

    // check if given property id is taken by data hash or meta property descriptor
    HasOwnProperty($, key) {

      return $.Reflect.has($, key);
    },

    PropertyIsEnumerable($, key) {

      const prop = LookupProperty($, key);

      return prop ? prop.Enumerable : FALSE;
    },

    IsPrototypeOf($, X) {

      // uses Proto chain if has no own property defined
      for (let target = $.Reflect.getPrototypeOf($); target; target = $.Reflect.getPrototypeOf($)) {
        if (X === target) {
          return TRUE;
        }
      }

      return FALSE;
    },

    __LookupGetter__($, key) {

      const prop = LookupProperty($, key);

      return prop ? prop.Getter : UNDEFINED;
    },

    __LookupSetter__($, key) {

      const prop = LookupProperty($, key);

      return prop ? prop.Setter : UNDEFINED;
    },

    __DefineGetter__($, key, fn) {

      if (HasOwnProperty($, key)) {

        $.Props[ key ].Getter = fn;

      } else {

        DefineProperty($, key, {
          Getter: fn,
          IsEnumerable: TRUE,
          IsConfigurable: TRUE
        })
      }
    },

    __DefineSetter__($, key, fn) {

      if (HasOwnProperty($, key)) {

        $.Props[ key ].Setter = fn;

      } else {

        DefineProperty($, key, {
          Setter: fn,
          IsEnumerable: TRUE,
          IsConfigurable: TRUE
        })
      }
    }
  })
};

export const ROOT_OBJECT = struct.Object(ROOT)
