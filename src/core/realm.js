import Global from '../global'
import Intrinsics from '../intrinsics'
import { struct } from './_structs';

const GlobalContext = struct.Context({

  Scope: struct.VariableScope({ Vars: struct.Hash() })
});

/**
 * Realm
 */
export const Realm = struct.Realm({

  Global,

  GlobalContext,

  Intrinsics
});