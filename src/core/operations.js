import { NULL, UNDEFINED } from './_const';
import { Return, Throw } from './context';

export const TYPE = ($) => $.$$type;

export const GET = ($, key) => {

  if ($ === UNDEFINED) {
    return Throw(`Cannot read property '${key}' of undefined`, TypeError);
  }

  if ($ === NULL) {
    return Throw(`Cannot read property '${key}' of null`, TypeError);
  }

  return $.Reflect.get($, key)
};

export const SET = ($, key, value) => {

  if ($ === UNDEFINED) {
    return Throw(`Cannot set property '${key}' of undefined`, TypeError);
  }

  if ($ === NULL) {
    return Throw(`Cannot set property '${key}' of null`, TypeError);
  }

  $.Reflect.set($, key, value)
};

export const DEL = ($, key) => {
};

export const ASSIGN_VAR = ($, key) => {
};

export const GET_VAR = ($, key) => {
};

export const OBJECT = (initials) => {
};

export const FUNCTION = (code) => {
};

export const NEW = ($, ...args) => {

  return $.Reflect.construct(args, $);
};

export const APPLY = ($, This, Arguments) => {

  return $.Reflect.apply($, This, Arguments);
};

export const CALL_METHOD = ($, name, ...args) => {

  const fn = $.Reflect.get($, name);

  return fn.Reflect.apply(fn, $, args);
};

export const IS_NUMBER = (a) => !isNaN(a + 0);

export const PLUS = (a, b) => a + b;

export const MINUS = (a, b) => a - b;

export const EQUAL = (a, b) => a === b

export const TO_STRING = ($) => {

  return '' + $;
};

export const TO_OBJECT = ($) => {

  if ($ === UNDEFINED || $ === NULL) {
    return Throw(`Cannot convert undefined or null to object`, TypeError);
  }

  return $;
};
