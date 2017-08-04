/**
 * Object Constructor
 */
import { FUNCTION } from './function';
import { ROOT_OBJECT } from './object_root';

export const ObjectConstructor = FUNCTION({

  Name: 'Object',

  NewPrototype: ROOT_OBJECT,

  Code($, ...Arguments) {
    // no-op
  }
});

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

  GetOwnKeys: ($) => [ ...$.Data.Keys() ].filter(p => p.IsEnumerable).map(p => p.Id)

})