import { lookupVar } from '../core/context';
import { THROW } from './flow';
import { UNDEFINED } from '../core/_const';

/**
 * Gets a value bound to a Variable.
 *
 * @param name variable name
 * @returns {*}
 */
export function GET_VAR(name) {

  const variable = lookupVar(name);

  if (variable === UNDEFINED) {

    THROW(`variable ${name} is not defined`, 'ReferenceError');
  }

  return variable.value;
}

/**
 * Binds a variable to a value.
 */
export function ASSIGN_VAR(name, value) {

  const variable = lookupVar(name);

  if (variable === UNDEFINED) {

    THROW(`variable ${name} is not defined`, 'ReferenceError');
  }

  variable.value = value;
}

