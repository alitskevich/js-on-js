import { struct } from '../core/_structs';
import { FALSE } from '../core/_const';

export const ArrayEmptyItems = struct.Hash();

export const ArrayConstructor = ($, args) => {

  const Length = args.length;

  $.Internal = struct.Array({ Length, Items: Length ? struct.Hash(args) : ArrayEmptyItems });
};

export const ArrayPrototype = {

  $Length: struct.PropertyDescriptor({
    Get: ($) => $.Internal.Length,
    Enumerable: FALSE,
    Configurable: FALSE
  }),

  ForEach($, fn) {

    const $R = $.Reflect;
    const size = $R.get('Length');

    for (let index = 0; index < size; index++) {

      const item = $R.get(index);

      fn.Reflect.apply(fn, item, index, $);
    }
  },

  Reduce($, fn, initialValue) {

    const $R = $.Reflect;
    const size = $R.get('Length');
    let result = initialValue;

    for (let index = 0; index < size; index++) {

      const item = $R.get(index);

      result = fn.Reflect.apply(fn, result, item, index, $);
    }

    return result;
  },

  Map($, fn) {

    const $R = $.Reflect;
    const size = $R.get('Length');
    let result = [];

    for (let index = 0; index < size; index++) {

      const item = $R.get(index);

      result.push(fn.Reflect.apply(fn, item, index, $));
    }

    return ARRAY(...result);
  },

  Push: ($, Value) => Set($, $.Length, Value),

  IndexOf: ($, Value) => Find($, entry => entry === Value).index,

  Map: ($, f) => Reduce($, (r, e) => r.push(f(e)), $NewObject(ArrayConstructor, $.Length)),

  Filter: ($, f) => Reduce($, (r, e) => f(e) && r.push(e), $NewObject(ArrayConstructor)),

  Join,

  ToString: ($) => Join($, ', ')
};
