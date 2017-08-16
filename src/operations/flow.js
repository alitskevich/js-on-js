import { NULL, UNDEFINED } from './_const';
import { Return } from './context';
import { struct } from './_structs';
import { IS_FUNCTION, TO_STRING } from './coersion';

export function RETURN(result = UNDEFINED) {

  Return(result);
}

export function THROW(Error, type = `Error`) {

  Return(UNDEFINED, Error);
}

export const APPLY = ($, This, Arguments) => {

  if (!IS_FUNCTION($)) {

    return THROW(`${TO_STRING($)} is not a function`, TypeError);
  }

  return $.Reflect.apply($, This, Arguments);
};


