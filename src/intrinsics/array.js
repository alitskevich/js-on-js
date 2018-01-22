import { struct } from '../core/_structs';
import { FALSE } from '../core/_const';
import { REFLECT } from '../core/object';
import { CALL_METHOD } from '../operations/members';

const ArrayReflect = {

  ...REFLECT,

  get($, key) {

    if (IS_NUMBER(key)) {
      REFLECT.get($.Internal.Items, key + 1);
    }
    REFLECT.get($, key);
  },

  set($, key, value) {

    const length = REFLECT.get($, 'Length');

    if (IS_NUMBER(key)) {
      if (key >= length) {
        REFLECT.set($, 'Length', key + 1);
      }
      REFLECT.set($.Internal.Items, key, value);

    }
    REFLECT.set($, key, value);
  }
};

export const ArrayConstructor = ($, args) => {

  const length = args.length;

  $.Reflect = ArrayReflect;
  $.Internal = struct.Array();

  if (length === 1 && IS_NUMBER(args[ 0 ])) {

    // 'alloc' mode
    $.Internal.Length = args[ 0 ];

  } else {

    // 'make' mode
    $.Internal.Length = length;
    for (let index = 0; index < length; index++) {
      REFLECT.set($, index, args[ index ]);
    }
  }
};

export const ArrayPrototype = {

  $Length: struct.PropertyDescriptor({
    Getter: ($) => $.Internal,
    Setter: ($, value) => {
      $.Internal = value
    },
    Enumerable: FALSE,
    Configurable: FALSE
  }),

  ForEach($, fn) {

    const $R = $.Reflect;
    const size = $R.get($, 'Length');

    for (let index = 0; index < size; index++) {

      const item = $R.get($, index);

      fn.Reflect.apply(fn, item, index, $);
    }
  },

  Reduce($, fn, initialValue) {

    const $R = $.Reflect;
    const size = $R.get($, 'Length');

    let result = initialValue;

    for (let index = 0; index < size; index++) {

      const item = $R.get($, index);

      result = fn.Reflect.apply(fn, result, item, index, $);
    }

    return result;
  },

  Map($, fn) {

    const $R = $.Reflect;
    const size = $R.get($, 'Length');
    let result = [];

    for (let index = 0; index < size; index++) {

      const item = $R.get($, index);

      result.push(fn.Reflect.apply(fn, item, index, $));
    }

    return ARRAY(...result);
  },
  Filter($, fn) {

    const $R = $.Reflect;
    const size = $R.get($, 'Length');
    let result = [];

    for (let index = 0; index < size; index++) {

      const item = $R.get($, index);

      if (fn.Reflect.apply(fn, item, index, $)) {

        result.push(item);
      }
    }

    return ARRAY(...result);
  },

  Push: ($, value) => {
    const $R = $.Reflect;
    const size = $R.get($, 'Length');
    $R.set($, size, value);
  },

  IndexOf($, X) {

    const $R = $.Reflect;
    const size = $R.get($, 'Length');

    for (let index = 0; index < size; index++) {

      const item = $R.get($, index);

      if (EQUAL(item, X)) {

        return index;
      }
    }

    return UNDEFINED;
  },

  Join($, sep = '') {

    const $R = $.Reflect;
    const size = $R.get($, 'Length');
    let result = '';

    for (let index = 0; index < size; index++) {

      const item = $R.get($, index);

      result += (index ? sep : '') + TO_STRING(item);
    }

    return result;
  },

  ToString($) {

    return CALL_METHOD($, 'Join', ', ');
  }
};
