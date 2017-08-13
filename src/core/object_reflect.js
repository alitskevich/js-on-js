import { struct } from './_structs';
import { LookupProperty, ValueProperty } from './object_property';
import { FALSE, UNDEFINED } from './_const';
import { Apply } from './context';
import { OBJECT } from './object';

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

    return Apply($.Internal, This, Arguments);
  },

  /**
   * The new operator as a function. Equivalent to calling new target(...args).
   * @param $
   * @param args
   * @returns {*}
   */
  construct($, ...args) {

    const $new = OBJECT({}, $.Internal.NewPrototype);

    Apply($.Internal, $new, args);

    return $new;
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

      if (prop.Getter) {

        return prop.Getter($);
      }

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

      if (prop.Setter) {

        prop.Setter($, key, value);

      }

    } else {

      $.Props[ key ] = ValueProperty(value);
    }
  },

  getPrototypeOf($) {

    return $.Proto
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

/**
 * The Reflect object provides the following static functions which have the same names as the proxy handler methods.
 * Some of these methods are the same as corresponding methods on Object.
 */
export const ORDINARY_OBJECT_REFLECT = struct.Reflect(REFLECT);

