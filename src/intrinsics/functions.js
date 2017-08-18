import { translate } from '../translate/index';
import { Apply, MakeInternalFunction } from '../core/context';
import { MakeObject } from '../core/object';
import { REFLECT } from '../core/object';
import { struct, TYPE } from '../core/_structs';
import { NULL } from '../core/_const';
import { TYPES } from '../core/_types';

export const IsFunction = ($) => TYPE($) === TYPES.OBJECT && TYPE($.Internal) === TYPES.FUNCTION;

const FUNCTION_REFLECT = {

  ...REFLECT,

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
  construct($, Arguments) {

    const $new = MakeObject({}, $.Internal.Prototype);

    Apply($.Internal, $new, Arguments);

    return $new;
  },

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

  $.Internal = MakeInternalFunction({ Parameters, Prototype: MakeObject({ Constructor: $ }) });

  translate($.Internal, Source);
};

/**
 * FunctionPrototype
 */
export const FunctionPrototype = {

  Length: struct.PropertyDescriptor({
    Get: ($) => $.Internal.Parameters.length
  }),

  Apply: ($, This, Arguments) => Apply($.Internal, This, Arguments),

  Call: ($, This, ...Arguments) => Apply($.Internal, This, Arguments),

  Bind: ($, BoundToThis, ...Arguments) => MakeFunction({
    BoundToThis,

    Code($this, ...args) {
      Apply($.Internal, $this.BoundToThis, [ ...Arguments, ...args ])
    }
  })
};

export function MakeFunction(initials) {

  const $ = MakeObject({}, FunctionPrototype, NULL, NULL);

  $.Reflect = FUNCTION_REFLECT;

  $.Internal = MakeInternalFunction({ ...initials, Prototype: MakeObject({ Constructor: $ }) });

  return $;
}

/**
 * Evaluate an expression from source
 *
 @param {*} source
 @return {Object}
 */
export const Eval = (source) => {

  const fn = MakeInternalFunction({});

  translate(fn, 'return ' + source);

  return Apply(fn);
};
