import { FUNCTION } from './function';
import { ROOT_OBJECT } from './object_root';

export const ProxyConstructor = FUNCTION({

  Name: 'Proxy',

  NewPrototype: ROOT_OBJECT,

  Code($, handler, target) {
    // TODo
  }
});
