/**
 * Root object instance
 */
import { struct } from './_structs.js';
import { LookupPropertyDescriptor, EnsureOwnProperty, PROTO_PROPERTY } from './object_property';

export const ROOT_OBJECT = struct.Object({

  Meta: struct.Hash({
    __Proto__: PROTO_PROPERTY
  }),
  Proto: null,
  Primitive: null,
  Data: struct.Hash({

    ValueOf: ($) => $.Primitive,

    ToString: ($) => `[object ${OBJECT_GET($, 'Proto.Constructor').name}]`,
    ToLocaleString: ($) => $.ToString(),

    __DefineGetter__: ($, Id, fn) => {
      EnsureOwnProperty($, Id).Getter = fn;
    },
    __DefineSetter__: ($, Id, fn) => {
      EnsureOwnProperty($, Id).Setter = fn;
    },

    __LookupGetter__($, Id) {
      const prop = LookupPropertyDescriptor($, Id);
      return prop ? prop.Getter : UNDEFINED;
    },
    __LookupSetter__($, Id) {
      const prop = LookupPropertyDescriptor($, Id);
      return prop ? prop.Setter : UNDEFINED;
    },

    HasOwnProperty($, Id) {

      return (Id in $.Data) || (Id in $.Meta);
    },

    PropertyIsEnumerable($, Id) {
      const prop = LookupPropertyDescriptor($, Id);
      return prop ? prop.IsEnumerable : true;
    },

    IsPrototypeOf($, X) {
      return false;
    }
  })
});
