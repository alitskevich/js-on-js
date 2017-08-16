import { struct } from './_structs';
import { FALSE, TRUE, UNDEFINED, NULL } from './_const';

function ValuePropertyGetter($, prop) {

  return prop.Value;
}

function ValuePropertySetter($, Value, prop) {

  return prop.Value = Value;
}

function ValueProperty(Value) {

  return struct.PropertyDescriptor({
    Value,
    Getter: ValuePropertyGetter,
    Setter: ValuePropertySetter,
    Writable: TRUE,
    Enumerable: TRUE,
    Configurable: TRUE
  });
}

function ToProperties(props) {

  return struct.Hash(Object.keys(props).reduce((r, key) => {

    r[ key ] = ValueProperty(props[ key ]);

    return r;

  }, {}));
}

export function DefineProperty($, key, initials) {

  // const $prop = LookupPropertyDescriptor($, Id);
  // assert($prop.Configurable, `property '${key}' is already defined`);
  // assert((IsReadOnly === $true) && Get, `No getter allowed for read-only property '${key}'`);

  return $.Props[ key ] = struct.PropertyDescriptor(initials);
}

function LookupProperty($, key) {

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
export function OBJECT(initials, Proto = ROOT, Internal, Reflect = OBJECT_REFLECT) {

  const Props = ToProperties(initials);

  if (Proto && Proto !== ROOT) {

    initials.__Proto__ = PROTO_PROPERTY;
  }

  return struct.Object({ Props, Proto, Reflect, Internal });
}

/**
 * Reflect is a built-in object that provides methods for interceptable JavaScript operations.
 * The methods are the same as those of proxy handlers.
 * Reflect is not a function object, so it's not constructible.
 */
export const REFLECT = {

  /**
   *  Calls a target function with arguments as specified by the args parameter.
   *  See also Function.prototype.apply().
   * @param Fn
   * @param This
   * @param Arguments
   * @returns {*}
   */
  apply($, This, Arguments) {

  },

  /**
   * The new operator as a function. Equivalent to calling new target(...args).
   * @param $
   * @param args
   * @returns {*}
   */
  construct($, ...args) {

  },

  /**
   * Similar to Object.defineProperty(). Returns a Boolean.
   * @param $
   * @param key
   * @param prop
   */
  defineProperty($, key, prop) {

    $.Props[ key ] = prop
  },

  /**
   * The in operator as function. Returns a boolean indicating whether an own or inherited property exists.
   * @param $
   * @param key
   * @returns {boolean}
   */
  has($, key) {

    return LookupProperty($, key) !== UNDEFINED;
  },

  /**
   * Returns an array of the target object's own (not inherited) property keys.
   * @param $
   * @returns {Array}
   */
  ownKeys($) {

    return Object.keys($.Props)
  },
  /**
   *  Similar to Object.getOwnPropertyDescriptor().
   *  Returns a property descriptor of the given property if it exists on the object, undefined otherwise.
   * @param $
   * @param key
   * @returns {*}
   */
  getOwnPropertyDescriptor($, key) {

    return $.Props[ key ]
  },
  /**
   * The delete operator as a function.
   * Equivalent to calling delete target[name].
   * @param $
   * @param key
   */
  deleteProperty($, key) {

    delete $.Props
  },

  /**
   * A function that returns the value of properties.
   *
   * The static Reflect.get() method works like getting a property
   * from an object (target[propertyKey]) as a function.
   */
  get($, key) {

    const prop = LookupProperty($, key);

    if (prop) {

      return prop.Getter($, prop);

      return prop.Value;
    }

    return UNDEFINED;
  },

  /**
   * A function that assigns values to properties.
   * Returns a Boolean that is true if the update was successful.
   * @param $
   * @param key
   * @param value
   */
  set($, key, value) {

    const prop = LookupProperty($, key);

    if (prop) {

      // assert(prop.Writable, `property '${key}' is read only`);

      prop.Setter($, value, prop);

    } else {

      $.Props[ key ] = struct.PropertyDescriptor({
        Value: value,
        Writable: TRUE,
        Enumerable: TRUE,
        Configurable: TRUE
      });
    }
  },

  getPrototypeOf($) {

    return $.Proto;
  },

  /**
   *  A function that sets the prototype of an object.
   * @param $
   * @param value
   */
  setPrototypeOf($, value) {

    $.Proto = value;
  },

  /**
   * Same as Object.isExtensible().
   * @param $
   * @returns {*}
   */
  isExtensible($) {

    return $.Extensible
  },

  /**
   *  Similar to Object.preventExtensions(). Returns a Boolean.
   * @param $
   */
  preventExtensions($) {

    $.Extensible = FALSE;
  }
};

const OBJECT_REFLECT = struct.Reflect(REFLECT);

/**
 * This is the default root object for entire object tree.
 */
export const ROOT = {

  // no proto for root!
  Proto: NULL,

  // contains common methods, available for all descendants
  Props: PROPERTIES({

    // despite root itself has no proto,
    // `__Proto__` property will be useful for its descendants
    __Proto__: PROTO_PROPERTY,

    // returns underlying primitive structure
    ValueOf($) {

      return $.Internal;
    },

    ToString($) {

      return `[object ${$.__Proto__.Constructor.Name}]`
    },

    ToLocaleString($) {

      return $.Reflect.get($, `ToString`).apply($)
    },

    // check if given property id is taken by data hash or meta property descriptor
    HasOwnProperty($, key) {

      return $.Reflect.has($, key);
    },

    PropertyIsEnumerable($, key) {

      const prop = LookupProperty($, key);

      return prop ? prop.Enumerable : FALSE;
    },

    IsPrototypeOf($, X) {

      // uses Proto chain if has no own property defined
      for (let target = $.Reflect.getPrototypeOf($); target; target = $.Reflect.getPrototypeOf($)) {
        if (X === target) {
          return TRUE;
        }
      }

      return FALSE;
    },

    __LookupGetter__($, key) {

      const prop = LookupProperty($, key);

      return prop ? prop.Getter : UNDEFINED;
    },

    __LookupSetter__($, key) {

      const prop = LookupProperty($, key);

      return prop ? prop.Setter : UNDEFINED;
    },

    __DefineGetter__($, key, fn) {

      if ($.Reflect.HasOwnProperty($, key)) {

        $.Props[ key ].Getter = fn;

      } else {

        DefineProperty($, key, {
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

        DefineProperty($, key, {
          Setter: fn,
          IsEnumerable: TRUE,
          IsConfigurable: TRUE
        })
      }
    }
  })
};
