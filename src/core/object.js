import { struct } from './_structs';
import { ROOT_OBJECT } from './object_root';
import { LookupPropertyDescriptor, PROTO_PROPERTY } from './object_property';

/**
 * Object
 */
export function OBJECT(initials, proto = ROOT_OBJECT, primitive) {

  return struct.Object({

    Meta: struct.Hash(proto ? { __Proto__: PROTO_PROPERTY } : {}),
    Data: struct.Hash(initials),

    Proto: proto,

    Primitive: primitive
  });
}

export function OBJECT_GET($, Id) {

  const prop = LookupPropertyDescriptor($, Id);

  if (prop) {

    if (prop.Value) {

      return prop.Value;
    }

    if (prop.Getter) {

      return prop.Getter($, Id);
    }

    // throw
  }

  for (let target = $; target; target = target.Proto) if (Id in target.Data, Id) {
    return target.Data[ Id ];
  }

  return undefined;
}

export function OBJECT_SET($, Id, Value) {

  const prop = LookupPropertyDescriptor($, Id);

  if (prop) {
    if (prop.Setter) {
      prop.Setter($, Id, Value);
    } else {
      // throw
    }

  } else {

    $.Data[ Id ] = Value;
  }

  // assert(prop.IsReadOnly, `property '${key}' is read only`);

}

