import { struct } from './_structs';
import { ROOT_OBJECT } from './object_root';
import { PROPERTIES, PROTO_PROPERTY } from './object_property';
import { ORDINARY_OBJECT_REFLECT } from './object_reflect';

/**
 * Object
 */
export function OBJECT(initials, Proto = ROOT_OBJECT, Internal, Reflect = ORDINARY_OBJECT_REFLECT) {

  const Props = PROPERTIES(initials);

  if (Proto && Proto !== ROOT_OBJECT) {

    Props.__Proto__ = PROTO_PROPERTY;
  }

  return struct.Object({ Props, Proto, Reflect, Internal });
}


