/**
 * Function
 */
import { FUNCTION, FUNCTION_PROTO } from '../core/function';
import { struct } from '../core/_structs';
import { currentScope } from '../core/context';

/**
 @param {*} x
 @return {Object}
 */
export const Eval = (x) => {
  return eval(x)
}
/**
 * FunctionPrototype
 */
export const FunctionPrototype = FUNCTION_PROTO;

/**
 * FunctionConstructor
 * @param $
 * @param parameters
 * @param source
 * @constructor
 */
export const FunctionConstructor = ($, parameters, source) => {

  $.Internal = struct.Function({

    Parameters: parameters || [],

    Name: '',

    // to be parent for a new variable scope in Apply()
    LexicalScope: currentScope(),

    // to be referred as prototype by each object that newly constructed with this function
    NewPrototype: { Constructor: $ }
  });

  // translate($.Internal, source);
};
