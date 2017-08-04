import { INVOKE, RETURN, VAR } from '../src/core/index';
import { FUNCTION } from '../src/core/function';

function a2() {

  const Fn = FUNCTION({
    Parameters: [ 'a' ],
    LocalVariables: [],
    Name: 'test',
    Code: () => {
      RETURN(VAR('a'))
    }
  });

  return INVOKE(Fn, null, [ 1 ]);

}

console.log(a2());
