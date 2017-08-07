import { struct } from './_structs';
import { ROOT_OBJECT } from './object_root';
import { LookupPropertyDescriptor, PROTO_PROPERTY } from './object_property';
import { UNDEFINED } from './globals';

/**
 * Object
 */
export function OBJECT(initials, proto = ROOT_OBJECT, primitive) {

  return struct.Object({

    Meta: struct.Hash(proto && proto !== ROOT_OBJECT ? { __Proto__: PROTO_PROPERTY } : {}),

    Data: struct.Hash(initials),

    Proto: proto,

    Subject: primitive
  });
}

export function OBJECT_GET($, key) {

  const prop = LookupPropertyDescriptor($, key);

  if (prop) {

    if (prop.Value) {

      return prop.Value;
    }

    if (prop.Getter) {

      return prop.Getter($);
    }

    // throw
  }

  for (let target = $; target; target = target.Proto) {
    if (key in target.Data) {
      return target.Data[ key ];
    }
  }

  return UNDEFINED;
}

export function OBJECT_SET($, key, value) {

  const prop = LookupPropertyDescriptor($, key);

  if (prop) {

    if (prop.Setter) {
      prop.Setter($, key, value);
    } else {
      // assert(prop.IsReadOnly, `property '${key}' is read only`);
    }

  } else {

    $.Data[ key ] = value;
  }

}

