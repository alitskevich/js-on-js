import { struct } from './core/_structs';
import { UNDEFINED } from './core/_const';

export function CreateRealm(Intrinsics, HostDefined) {

  return struct.Realm({

    GlobalObject: UNDEFINED,

    GlobalContext: UNDEFINED,

    Intrinsics: struct.Hash(Intrinsics),

    HostDefined
  });
}
