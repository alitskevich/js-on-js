import Source from 'html-loader!../samples/hello.js';
import { translate } from '../src/translate/index';
import { INVOKE, FUNCTION } from '../src/operations/flow';

function a2() {

  const Fn = FUNCTION({
    Parameters: [ 'a' ],
    LocalVariables: [],
    Name: 'test'
  });

  translate(Source, Fn.Internal);

  return INVOKE(Fn, null, [ 1 ]);

}

console.log(a2());
