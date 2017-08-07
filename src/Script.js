import { GlobalContext, FunctionCreate } from './native';
import { FUNCTION } from './core/function';

export class Script {

  main(Source, params) {

    const Fn = FUNCTION({ Source });

    return APPLY(Fn, params);
  }

}
