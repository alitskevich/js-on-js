/**
 * Root object instance
 */
import { struct } from '../impl/structs.js';
import { MAP } from '../impl/map';
import { FUNCTION_APPLY } from './apply';

const __LookupGetter__ = ($, Id) => {
  const prop = lookupPropertyDescriptor($, Id);
  return prop ? prop.Getter : UNDEFINED;
};
const __LookupSetter__ = ($, Id) => {
  const prop = lookupPropertyDescriptor($, Id);
  return prop ? prop.Setter : UNDEFINED;
};
const HasOwnProperty = ($, Id) => {

  return MAP_HAS_KEY($.Data, Id) || MAP_HAS_KEY($.Meta, Id);
};
const IsPrototypeOf = () => {
  return false;
};
const PropertyIsEnumerable = ($, Id) => {
  return lookupPropertyDescriptor($, Id).IsEnumerable;
};

const ToString = ($) => `[object ${OBJECT_GET($, 'Proto.Constructor').name}]`;

export const ROOT = struct.Object({
  Data: MAP({
    ValueOf: ($) => $.Primitive,
    ToString,
    ToLocaleString: ($) => FUNCTION_APPLY(OBJECT_GET($, 'toString'), $),
    __DefineGetter__: ($, Id, fn) => {
      ensureProperty($, Id).Getter = fn;
    },
    __DefineSetter__: ($, Id, fn) => {
      ensureProperty($, Id).Setter = fn;
    },
    __LookupGetter__,
    __LookupSetter__,
    HasOwnProperty,
    IsPrototypeOf,
    PropertyIsEnumerable
  })
});
