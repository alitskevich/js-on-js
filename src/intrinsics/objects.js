/**
 * Object Constructor
 */
import { ROOT } from '../core/object';
import { TYPES } from '../core/_types';
import { TYPE } from '../core/_structs';
import { MakeObject } from '../core/object';
import { Throw } from '../core/context';
import { StringPrototype } from './strings';

export const ToObject = ($) => {

  const type = TYPE($);

  if (type === TYPES.UNDEFINED || type === TYPES.NULL) {
    return Throw(`Cannot convert undefined or null to object`, TypeError);
  }

  if (type === TYPES.OBJECT) {

    return $;
  }

  if (type === TYPES.STRING) {

    return MakeObject({}, StringPrototype);
  }

  if (type === TYPES.NUMBER) {

    return MakeObject({}, StringPrototype);
  }
};

export const ObjectPrototype = ROOT;

export const ObjectConstructor = ($, ...Arguments) => {
  // no-op
};

Object.assign(ObjectConstructor, {

  Create(prototype) {

    const type = $typeOf(prototype);

    assert(type === 'object' || prototype === $null,
      `Object prototype may only be an Object or null: undefined ${type}`,
      TypeError
    );

    return $Object(prototype);
  },

  Assign(Target, ...Sources) {

    assert(Target, `Unable to assign to ${Target}`);

    Sources.forEach(Source => Assign(Target, Source));

    return Target;
  },

  Keys($) {

    const preceding = $.__Proto__ ? $.__Proto__.GetKeys() : [];

    const own = $.GetOwnKeys().filter(Id => !preceding.includes(Id));

    return [ ...preceding, ...own ];
  },

  GetOwnKeys: ($) => [ ...$.Props.Keys() ].filter(p => p.Enumerable),

  DefineProperties($, props) {

    Object.keys(props).forEach(key => DefineProperty($, key, props[ key ]));
  }

});