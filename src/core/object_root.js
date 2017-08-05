import { struct } from './_structs.js';
import { LookupPropertyDescriptor, EnsureOwnProperty, PROTO_PROPERTY } from './object_property';
import { FALSE, TRUE, UNDEFINED, NULL } from './globals';

/**
 * This is the default root object in a prototype tree.
 *
 * '''
 *  obj = new Object();
 *  obj.__proto__
 * '''
 */
export const ROOT_OBJECT = struct.Object({

  // no proto for root!
  Proto: NULL,

  // must be specified in descendants
  Primitive: NULL,

  // despite root itself has no proto,
  // `__Proto__` property will be useful for its descendants
  Meta: struct.Hash({ __Proto__: PROTO_PROPERTY }),

  // contains common methods, available for all descendants
  Data: struct.Hash({

    // returns underlying primitive structure
    ValueOf($) {

      return $.Primitive
    },

    ToString($) {

      return `[object ${$.__Proto__.Constructor.Name}]`
    },

    ToLocaleString() {

      return ($) => $.ToString()
    },

    // check if given property id is taken by data hash or meta property descriptor
    HasOwnProperty($, Id) {

      return (Id in $.Data) || (Id in $.Meta);
    },

    PropertyIsEnumerable($, Id) {

      const prop = LookupPropertyDescriptor($, Id);
      return prop ? prop.IsEnumerable : TRUE;
    },

    IsPrototypeOf($, X) {

      // uses Proto chain if has no own property defined
      for (let target = $.Proto; target; target = $.Proto) if (X === target) {

        return TRUE;
      }

      return FALSE;
    },

    __LookupGetter__($, Id) {

      const prop = LookupPropertyDescriptor($, Id);
      return prop ? prop.Getter : UNDEFINED;
    },

    __LookupSetter__($, Id) {

      const prop = LookupPropertyDescriptor($, Id);
      return prop ? prop.Setter : UNDEFINED;
    },

    __DefineGetter__: ($, Id, fn) => {

      EnsureOwnProperty($, Id).Getter = fn;
    },

    __DefineSetter__: ($, Id, fn) => {

      EnsureOwnProperty($, Id).Setter = fn;
    }

  })
});
