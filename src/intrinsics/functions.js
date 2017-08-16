import { FunctionInternal } from '../core/function';
import { translate } from '../translate/index';
import { Apply } from '../core/context';
import { OBJECT } from '../core/object';
import { REFLECT } from '../core/object_reflect';
import { struct } from '../core/_structs';

/**
 * Evaluate expression from source
 *
 @param {*} source
 @return {Object}
 */
export const Eval = (source) => {

  const fn = FunctionInternal({});

  translate(fn, 'return ' + source);

  return Apply(fn);
};

const FUNCTION_REFLECT = {

  REFLECT,

  /**
   *  Calls a target function with arguments as specified by the args parameter.
   *  See also Function.prototype.apply().
   * @param $
   * @param This
   * @param Arguments
   * @returns {*}
   */
  apply($, This, Arguments) {

    return Apply($.Internal, This, Arguments);
  },

  /**
   * The new operator as a function. Equivalent to calling new target(...args).
   * @param $
   * @param args
   * @returns {*}
   */
  construct($, ...args) {

    const $new = OBJECT({}, $.Internal.Prototype);

    Apply($.Internal, $new, args);

    return $new;
  },

}
/**
 * FunctionPrototype
 */
export const FunctionPrototype = {

  Length: struct.PropertyDescriptor({
    Get: ($) => $.Internal.Parameters.length
  }),

  Apply: ($, This, Arguments) => Apply($.Internal, This, Arguments),

  Call: ($, This, ...Arguments) => Apply($.Internal, This, Arguments),

  Bind: ($, BoundToThis, ...Arguments) => FUNCTION({

    Code($this, ...args) {
      // todo
    }
  })
};

/**
 * FunctionConstructor
 * @param $
 * @param Parameters
 * @param Source
 * @constructor
 */
export const FunctionConstructor = ($, Parameters, Source) => {

  $.Reflect = FUNCTION_REFLECT;

  $.Internal = FunctionInternal({ Parameters });

  $.Internal.Prototype.Constructor = $;

  translate($.Internal, Source);
};

export function FUNCTION(fn) {

  const $ = OBJECT({}, FunctionPrototype, FunctionInternal(fn), FUNCTION_REFLECT);

  $.Internal.Prototype.Constructor = $;

  return $;
}
