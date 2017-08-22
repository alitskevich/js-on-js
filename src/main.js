import { InitGlobalContext } from './core/context';
import CreateGlobalObject from './global';
import Intrinsics from './intrinsics';
import { CreateRealm } from './realm';
import { APPLY } from './operations/flow';
import { NEW } from './operations/instantiation';
import { GET_VAR } from './operations/variables';

/**
 * JS runtime.
 *
 * @see https://www.ecma-international.org/ecma-262/8.0/
 */
export function main(Source, Params, HostDefined) {

  const Realm = CreateRealm(Intrinsics, HostDefined);

  const GlobalObject = CreateGlobalObject(Realm);

  InitGlobalContext(Realm);

  const Fn = NEW(GET_VAR("Function"), [ 'ENV' ], Source);

  return APPLY(Fn, GlobalObject, [ Params ]);
}
