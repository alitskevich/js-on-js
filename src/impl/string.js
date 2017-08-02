/**
 * String.
 */
import { TYPE_STRING, TYPE_STRING_EMPTY } from './_const';
import { MAKE } from './alloc';

export function STRING(S) {

  const size = S && S.length;

  if (size === 0) {
    return TYPE_STRING_EMPTY;
  }

  return MAKE(TYPE_STRING, S.split(''));
}
