import { struct } from './_structs';
import { FALSE, TRUE } from './globals';

/**
 * Property descriptor for Object
 */
export const PROTO_PROPERTY = struct.PropertyDescriptor({
  Getter($) {
    return $.Proto
  },
  Setter($, value) {
    $.Proto = value;
  },
  IsEnumerable: FALSE,
  IsConfigurable: FALSE
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

/**
 * Returns existing own meta or creates a new one.
 *
 * @returns struct.PropertyDescriptor .
 */
export function EnsureOwnProperty($, Id) {

  if (Id in $.Meta) {
    return $.Meta[ Id ];
  }

  const prop = struct.PropertyDescriptor({
    IsEnumerable: TRUE,
    IsConfigurable: TRUE
  });

  return DefineProperty($, Id, prop)
}