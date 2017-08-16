import { FUNCTION } from './intrinsics/functions';
import { Apply, InitGlobalContext } from './core/context';
import CreateGlobalObject from './global';
import Intrinsics from './intrinsics';
import { CreateRealm } from './realm';

/**
 *
 * @see https://www.ecma-international.org/ecma-262/8.0/
 */
export function main(Source, Params, HostDefined) {

  const Realm = CreateRealm(Intrinsics, HostDefined);

  const GlobalObject = CreateGlobalObject(Realm);

  InitGlobalContext(GlobalObject, Realm);

  const Fn = FUNCTION({ Source });

  return Apply(Fn, Params);
}
