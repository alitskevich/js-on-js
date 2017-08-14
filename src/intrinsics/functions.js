/**
 * Function
 */
import { FUNCTION, FUNCTION_PROTO, FUNCTION_STRUCT } from '../core/function';
import { translate } from '../translate/index';

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

  $.Internal = FUNCTION_STRUCT({

    Parameters: parameters,
  });

  $.Internal.Prototype.Constructor = $;

  translate($.Internal, source);
};
