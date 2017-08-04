/**
 * Property
 */

import { struct } from './_structs';

export const PROTO_PROPERTY = struct.PropertyDescriptor({
  Getter: ($) => $.Proto,
  Setter: ($, value) => {
    $.Proto = value;
  },
  IsEnumerable: false,
  IsConfigurable: false
});

export function DefineProperty($, Id, Prop) {

  // const $prop = LookupPropertyDescriptor($, Id);
  // assert($prop.IsConfigurable, `property '${key}' is already defined`);
  // assert((IsReadOnly === $true) && Get, `No getter allowed for read-only property '${key}'`);

  return $.Meta[ Id ] = Prop;
}

export function LookupPropertyDescriptor($, Id) {

  // uses Proto chain if has no own property defined
  for (let target = $; target; target = $.Proto) if (Id in target.Meta) {
    return target.Meta[ Id ];
  }

  return undefined;
}

export function EnsureOwnProperty($, Id) {

  if (Id in $.Meta) {
    return $.Meta[ Id ];
  }

  const prop = struct.PropertyDescriptor({
    IsEnumerable: true,
    IsConfigurable: true
  });

  return DefineProperty($, Id, prop)
}