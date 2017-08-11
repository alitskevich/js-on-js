import { struct } from './_structs';
import { FALSE, TRUE, UNDEFINED } from './_const';

/**
 * Property descriptor for Object
 */
export const PROTO_PROPERTY = struct.PropertyDescriptor({
  Getter($) {
    return $.Reflect.getPrototypeOf($)
  },
  Setter($, value) {
    $.Reflect.setPrototypeOf($, value);
  },
  Enumerable: FALSE,
  Configurable: FALSE
});

export function ValueProperty(Value) {

  return struct.PropertyDescriptor({
    Value,
    Writable: TRUE,
    Enumerable: TRUE,
    Configurable: TRUE
  })
}

export function PROPERTIES(props) {

  return struct.Hash(Object.keys(props).reduce((r, key) => {

    r[ key ] = ValueProperty(props[ key ]);

    return r;

  }, {}))
}

export function DefineProperties($, props) {

  Object.keys(props).forEach(key => DefineProperty($, key, props[ key ]));

}

export function DefineProperty($, Id, Prop) {

  // const $prop = LookupPropertyDescriptor($, Id);
  // assert($prop.Configurable, `property '${key}' is already defined`);
  // assert((IsReadOnly === $true) && Get, `No getter allowed for read-only property '${key}'`);

  return $.Props[ Id ] = struct.PropertyDescriptor(Prop);
}

export function LookupProperty($, Id) {

  // uses Proto chain if has no own property defined
  for (let target = $; target; target = $.Proto) {

    if (Id in target.Props) {

      return target.Props[ Id ];
    }
  }

  return UNDEFINED;
}

