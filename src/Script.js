import { GlobalContext, FunctionCreate } from './native';
import { FUNCTION } from './core/function';

/**
 *
 * @see https://www.ecma-international.org/ecma-262/8.0/
 */
export class Script {

  main(Source, params) {

    const Fn = FUNCTION({ Source });

    return Apply(Fn, params);
  }

}
