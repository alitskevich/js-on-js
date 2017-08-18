import { UNDEFINED } from '../core/_const';
import { Return, Throw } from '../core/context';
import { IsFunction } from '../intrinsics/functions';

export function RETURN(result = UNDEFINED) {

  Return(result);
}

export function THROW(Error, type = `Error`) {

  Throw(Error);
}

export const APPLY = ($, This, Arguments) => {

  if (!IsFunction($)) {

    return
  }

  return $.Reflect.apply($, This, Arguments);
};


