import { struct, TYPE } from './_structs';
import { FALSE, TRUE, UNDEFINED, NULL } from './_const';
import { TYPES } from './_types';
import { Throw } from './context';

function valuePropertyGetter($, prop) {

  return prop.Value;
}

function valuePropertySetter($, value, prop) {

  return prop.Value = value;
}

function createValueProperty(Value) {

  return struct.PropertyDescriptor({
    Value,
    Getter: valuePropertyGetter,
    Setter: valuePropertySetter,
    Writable: TRUE,
    Enumerable: TRUE,
    Configurable: TRUE
  });
}

function toProperties(props = {}) {

  return struct.Hash(Object.keys(props).reduce((r, key) => {
    const value = props[ key ];

    r[ key ] = TYPE(value) === TYPES.PROPERTY ? value : createValueProperty(value);

    return r;

  }, {}));
}

function lookupProperty($, key) {

  // uses Proto chain if has no own property defined
  for (let target = $; target; target = $.Proto) if (key in target.Props) {

    return target.Props[ key ];
  }

  return UNDEFINED;
}

/**
 * Property descriptor for Object
 */
export const PROTO_PROPERTY = struct.PropertyDescriptor({
  Getter($) {
    return $.Reflect.getPrototypeOf($)
  },
  Setter($, value) {
    $.Reflect.setPrototypeOf($, value);
  },
  Enumerable: FALSE,
  Configurable: FALSE
});

/**
 * Object
 */
export function MakeObject(initials, Proto = OBJECT_ROOT, Internal = NULL, Reflect = OBJECT_REFLECT) {
  if (Proto && Proto !== OBJECT_ROOT) {

    initials.__Proto__ = PROTO_PROPERTY;
  }

    const Props = toProperties(initials);

  return struct.Object({ Props, Proto, Reflect, Internal, Extensible: TRUE });
}

/**
 * Reflect is a built-in object that provides methods to interact with objects associated to.
 */
export const REFLECT = {

  defineProperty($, key, initials) {

    // const $prop = LookupProperty($, Id);
    // assert($prop.Configurable, `property '${key}' is already defined`);
    // assert(!prop.Writable && Get, `No getter allowed for read-only property '${key}'`);

    return $.Props[ key ] = struct.PropertyDescriptor(initials);
  },

  has($, key) {

    return lookupProperty($, key) !== UNDEFINED;
  },

  /**
   * Returns an array of the target object's own (not inherited) property keys.
   * @param $
   * @returns {Array}
   */
  ownKeys($) {

    return Object.keys($.Props)
  },

  getOwnPropertyDescriptor($, key) {

    return $.Props[ key ]
  },

  deleteProperty($, key) {

    delete $.Props[ key ]
  },

  get($, key) {

    const prop = lookupProperty($, key);

    return prop ? prop.Getter($, prop) : UNDEFINED;
  },

  /**
   * A function that assigns values to properties.
   * Returns a Boolean that is true if the update was successful.
   * @param $
   * @param key
   * @param value
   */
  set($, key, value) {

    const prop = lookupProperty($, key);

    if (prop) {

      // assert(prop.Setter, `property '${key}' is read only`);

      prop.Setter($, value, prop);

    } else {

      // assert($.Extensible, `property '${key}' is not extensible`);

      $.Props[ key ] = createValueProperty(value);
    }
  },

  getPrototypeOf($) {

    return $.Proto;
  },

  setPrototypeOf($, value) {

    $.Proto = value;
  },

  isExtensible($) {

    return $.Extensible
  },

  preventExtensions($) {

    $.Extensible = FALSE;
  }
};

const OBJECT_REFLECT = struct.Reflect(REFLECT);

/**
 * This is initials for root object.
 */
export const ROOT = {

  // despite root itself has no proto,
  // `__Proto__` property will be useful for its descendants
  __Proto__: PROTO_PROPERTY,

  // returns object value
  ValueOf($) {

    return $;
  },

  ToString($) {

    return `[object ${$.__Proto__.Constructor.Name}]`
  },

  ToLocaleString($) {

    return $.Reflect.get($, `ToString`).apply($)
  },

  // check if given property is defined by object itself(no prototype chain)
  HasOwnProperty($, key) {

    return $.Reflect.has($, key);
  },
  // check if given property is enumerable
  PropertyIsEnumerable($, key) {

    const prop = lookupProperty($, key);

    return prop ? prop.Enumerable : FALSE;
  },

  IsPrototypeOf($, X) {

    // uses Proto chain if has no own property defined
    for (let target = $.Reflect.getPrototypeOf($); target; target = target.Reflect.getPrototypeOf($)) {
      if (X === target) {
        return TRUE;
      }
    }

    return FALSE;
  },

  __LookupGetter__($, key) {

    const prop = lookupProperty($, key);

    return prop ? prop.Getter : UNDEFINED;
  },

  __LookupSetter__($, key) {

    const prop = lookupProperty($, key);

    return prop ? prop.Setter : UNDEFINED;
  },

  __DefineGetter__($, key, fn) {

    if ($.Reflect.HasOwnProperty($, key)) {

      $.Props[ key ].Getter = fn;

    } else {

      $.Reflect.defineProperty($, key, {
        Getter: fn,
        IsEnumerable: TRUE,
        IsConfigurable: TRUE
      })
    }
  },

  __DefineSetter__($, key, fn) {

    if ($.Reflect.HasOwnProperty($, key)) {

      $.Props[ key ].Setter = fn;

    } else {

      $.Reflect.defineProperty($, key, {
        Setter: fn,
        IsEnumerable: TRUE,
        IsConfigurable: TRUE
      })
    }
  }
};

/**
 * This is the default root object for entire object tree.
 * Has no proto.
 * Also provides set of common methods, available for all descendants.
 */
export const OBJECT_ROOT = MakeObject(ROOT, /* no proto for root*/ NULL);


