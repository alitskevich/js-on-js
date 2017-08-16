import { NULL, UNDEFINED } from '../core/_const';
import { APPLY, THROW } from './flow';
import { TO_OBJECT, TO_STRING } from './coersion';

export const GET = ($, key) => {

  if ($ === UNDEFINED || $ === NULL) {

    return THROW(`Cannot read property '${key}' of ${TO_STRING($)}`, TypeError);
  }

  return $.Reflect.get($, key);
};

export const SET = ($, key, value) => {

  if ($ === UNDEFINED || $ === NULL) {

    return THROW(`Cannot set property '${key}' of ${TO_STRING($)}`, TypeError);
  }

  $.Reflect.set($, key, value)
};

export const DEL = ($, key) => {

  const $obj = TO_OBJECT($);

  $obj.Reflect.deleteProperty($obj, key);
};

export const CALL_METHOD = ($, name, ...args) => {

  return APPLY(GET($, name), $, args);
};
