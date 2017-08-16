import { TYPES } from '../core/_types';
import { TYPE } from '../core/_structs';
import { THROW } from './flow';

export const IS_NUMBER = (a) => TYPE($) === TYPES.NUMBER;

export const IS_FUNCTION = ($) => TYPE($) === TYPES.OBJECT && TYPE($.Internal) === TYPES.FUNCTION;

export const TO_STRING = ($) => {

  return '' + $;
};

export const TO_NUMBER = ($) => {

  return 0 + $;
};

export const TO_OBJECT = ($) => {

  const type = TYPE($);

  if (type === TYPES.UNDEFINED || type === TYPES.NULL) {
    return Throw(`Cannot convert undefined or null to object`, TypeError);
  }

  if (type === TYPES.OBJECT) {

    return $;
  }

  if (type === TYPES.STRING) {

    return OBJECT({}, StringPrototype);
  }

  if (type === TYPES.NUMBER) {

    return OBJECT({}, StringPrototype);
  }
}