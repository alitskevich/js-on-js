import { FUNCTION } from './function';
import { ROOT_OBJECT } from './object_root';

/**
 *
 *
 * @see https://github.com/GoogleChrome/proxy-polyfill/blob/master/proxy.js
 */
export const ProxyConstructor = FUNCTION({

  Name: 'Proxy',

  NewPrototype: ROOT_OBJECT,

  Code($, handler, target) {
    // TODo
  }
});
