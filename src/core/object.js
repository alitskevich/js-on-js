import { struct } from '../impl/structs'
import { FALSE, UNDEFINED } from '../impl/_const';
import { MAP, MAP_GET, MAP_HAS_KEY, MAP_SET } from '../impl/map';
import { FUNCTION } from './function';
import { ROOT } from './root';
// ----------------------------------------------
// Object
// ----------------------------------------------

/**
 * Property
 */
export function PROPERTY_DEFINE($, Id, Prop) {

  // const $prop = LookupPropertyDescriptor($, Id);
  // assert($prop.IsConfigurable, `property '${key}' is already defined`);
  // assert((IsReadOnly === $true) && Get, `No getter allowed for read-only property '${key}'`);

  MAP_SET($.Meta, Id, Prop);
}

const PROTO_PROPERTY = struct.PropertyDescriptor({
  Getter: ($, key) => $.Proto,
  Setter: ($, key, value) => {
    $.Proto = value;
  },
  IsEnumerable: FALSE,
  IsConfigurable: FALSE
});

/**
 * Object
 */
export function OBJECT(initials, proto, primitive) {

  const Meta = proto ? MAP({ __Proto__: PROTO_PROPERTY }) : MAP();

  const Data = MAP(initials)

  return struct.Object({
    Meta,
    Data,
    Proto: proto,
    Primitive: primitive
  });
}

export function OBJECT_GET($, Id) {

  if ($ < 0) {
    // ($, key) => fnThrow(`Cannot read property '${key}' of undefined`, TypeError),
    return UNDEFINED;
  }

  const prop = lookupPropertyDescriptor($, Id);

  if (prop && prop.Value) {

    return prop.Value;
  }

  if (prop && prop.Getter) {

    return prop.Getter($, Id);
  }

  for (let target = $; target; target = target.Proto) {
    if (MAP_HAS_KEY(target.Data, Id)) {
      return MAP_GET(target.Data, Id);
    }
  }

  return UNDEFINED;
}

export function OBJECT_SET($, Id, Value) {

  if ($ < 0) {
    // ($, key, value) => fnThrow(`Cannot set property '${key}' of undefined`, TypeError),
    return;
  }

  const prop = lookupPropertyDescriptor($, Id);

  if (prop && prop.Setter) {

    prop.Setter($, Id, Value);
  } else {

    MAP_SET($.Data, Id, Value);
  }

  // assert(prop.IsReadOnly, `property '${key}' is read only`);

}

function lookupPropertyDescriptor($, Id) {

  // uses Proto chain if has no own property defined
  for (let target = $; target; target = $.Proto) {
    let prop = MAP_GET(target.Meta, Id);
    if (prop !== UNDEFINED) {
      return prop;
    }
  }

  return UNDEFINED;
}

function ensureProperty($, Id) {

  let prop = MAP_GET($.Meta, Id);

  if (prop === UNDEFINED) {
    prop = struct.PropertyDescriptor({
      IsEnumerable: TRUE,
      IsConfigurable: TRUE
    });
    PROPERTY_DEFINE($, Id, prop);
  }
  return prop;
}

/**
 * Object Constructor
 */
export const ObjectConstructor = FUNCTION({

    Name: 'Object',

    NewPrototype: ROOT,

    Code($, ...Arguments) {
      // no-op
    }

  },
  {

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

  });
