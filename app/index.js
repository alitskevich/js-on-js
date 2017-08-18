import Source from 'html-loader!../samples/hello.js';
import { main } from '../src/main';

function a2() {

  return main(Source, [ 1 ]);
}

console.log(a2());
