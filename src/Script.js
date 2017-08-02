import { GlobalContext, FunctionCreate } from './native';

export class Script {

  main() {

    const Context = GlobalContext(this.process.stack);

    const Fn = FunctionCreate({ Code: this.code });

    return Fn.Apply(Context, this.params);
  }

}
