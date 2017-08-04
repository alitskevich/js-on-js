import {
  $Function, SetConstructorPrototype, $NewObject, SizeOf,
  CreatePropertyDescriptor
} from '../index';
import { ForEach, Find, Reduce, ensureIndex } from '../_core';

const Set = ($, Index, Value) => (ensureIndex($.Data, Index)[ Index ] = Value);
const Join = ($, sep = '') => Reduce($, (r, e) => r ? `${r}${sep}${e.ToString()}` : e.ToString());

export const LENGTH_DESCRIPTOR = CreatePropertyDescriptor({
  Get: ($, key) => Read($, PROTO_INDEX),
  Set: ($, key, value) => Write($, value, PROTO_INDEX),
  IsEnumerable: $false,
  IsConfigurable: $false
});

export const ArrayConstructor = FUNCTION({

  Code(Constructor, args) {

    $.Primitive = ALLOC(TYPE_ARRAY, args);
  },
  NewPrototype: ARRAY_PROTO
});

const ARRAY_PROTO = OBJECT({

  $Get_Length: SizeOf,

  ForEach,

  Reduce,

  Push: ($, Value) => Set($, $.Length, Value),

  IndexOf: ($, Value) => Find($, entry => entry === Value).index,

  Map: ($, f) => Reduce($, (r, e) => r.push(f(e)), $NewObject(ArrayConstructor, $.Length)),

  Filter: ($, f) => Reduce($, (r, e) => f(e) && r.push(e), $NewObject(ArrayConstructor)),

  Join,

  ToString: ($) => Join($, ', ')
});

// creates a new string
export function ValueOfIndex($, index) {

  const length = SizeOf($);

  return (index < ZERO || index >= length) ? $undefined : Read($, index);
}

export function ForEach($, fn) {

  const size = SizeOf($);

  for (let index = 0; index < size; index++) {

    const item = Read($, index);

    fn.call($, item, index, $);
  }

  return $;
}

export function Find($, fn) {

  const size = SizeOf($);

  for (let index = 0; index < size; index++) {

    const item = Read($, index);

    if (fn(item)) {

      return item;
    }
  }

  return $undefined;
}

export function Reduce($, fn, initialValue) {

  const size = SizeOf($);

  let result = initialValue;

  for (let index = 0; index < size; index++) {

    const item = Read($, index);

    result = fn.call($, result, item, index, $);

  }

  return result;
}

export function Remap($, fn) {

  const size = SizeOf($);

  let result = $ArrayWithSize(size);

  for (let index = 0; index < size; index++) {

    const input = Read($, index);

    const output = fn.call($, result, input, index, $);

    Write(result, index, output);
  }

  return result;
}
