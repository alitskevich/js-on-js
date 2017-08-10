import { INVOKE, RETURN, VAR } from '../src/core/object_reflect';
import { FUNCTION } from '../src/core/function';
import Source from 'html-loader!../samples/hello.js';
import { translate } from '../src/translate/index';

function a2() {

  const Fn = FUNCTION({
    Parameters: [ 'a' ],
    LocalVariables: [],
    Name: 'test'
  });

  translate(Source, Fn.Subject);

  return INVOKE(Fn, null, [ 1 ]);

}

console.log(a2());
