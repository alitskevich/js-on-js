import { NULL, UNDEFINED } from './_const';
import { Exit, Throw } from './context';

export { FUNCTION } from './function';
export { OBJECT } from './object';

export default {

  PLUS: (a, b) => a + b,
  MINUS: (a, b) => a - b,
  EQ: (a, b) => a === b,

  NEW($, ...args) {

    return $.Reflect.construct(args, $);
  },
  APPLY($, This, Arguments) {

    return $.Reflect.apply($, This, Arguments);
  },

  TO_OBJECT($) {

    if ($ === UNDEFINED || $ === NULL) {
      return Throw(`Cannot convert undefined or null to object`, TypeError);
    }

    return $;
  },
  GET($, key) {

    if ($ === UNDEFINED) {
      return Throw(`Cannot read property '${key}' of undefined`, TypeError);
    }

    if ($ === NULL) {
      return Throw(`Cannot read property '${key}' of null`, TypeError);
    }

    return $.Reflect.get($, key)
  },
  SET($, key, value) {

    if ($ === UNDEFINED) {
      return Throw(`Cannot set property '${key}' of undefined`, TypeError);
    }

    if ($ === NULL) {
      return Throw(`Cannot set property '${key}' of null`, TypeError);
    }

    $.Reflect.set($, key, value)
  },
  DEL($, key) {
  },
  ASSIGN_VAR($, key) {
  },
  GET_VAR($, key) {
  },
  OBJECT($, key) {
  },
  FUNCTION($, key) {
  }

};