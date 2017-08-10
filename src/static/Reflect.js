/**
 * Reflect is a built-in object that provides methods for interceptable JavaScript operations.
 * The methods are the same as those of proxy handlers.
 * Reflect is not a function object, so it's not constructible.
 */

/**
 * The static Reflect.get() method works like getting a property
 * from an object (target[propertyKey]) as a function.
 */

/**
 * The Reflect object provides the following static functions which have the same names as the proxy handler methods.
 * Some of these methods are the same as corresponding methods on Object.

 Reflect.apply()
 Calls a target function with arguments as specified by the args parameter. See also Function.prototype.apply().
 Reflect.construct()
 The new operator as a function. Equivalent to calling new target(...args).
 Reflect.defineProperty()
 Similar to Object.defineProperty(). Returns a Boolean.
 Reflect.deleteProperty()
 The delete operator as a function. Equivalent to calling delete target[name].
 Reflect.get()
 A function that returns the value of properties.
 Reflect.getOwnPropertyDescriptor()
 Similar to Object.getOwnPropertyDescriptor(). Returns a property descriptor of the given property if it exists on the object,  undefined otherwise.
 Reflect.getPrototypeOf()
 Same as Object.getPrototypeOf().
 Reflect.has()
 The in operator as function. Returns a boolean indicating whether an own or inherited property exists.
 Reflect.isExtensible()
 Same as Object.isExtensible().
 Reflect.ownKeys()
 Returns an array of the target object's own (not inherited) property keys.
 Reflect.preventExtensions()
 Similar to Object.preventExtensions(). Returns a Boolean.
 Reflect.set()
 A function that assigns values to properties. Returns a Boolean that is true if the update was successful.
 Reflect.setPrototypeOf()
 A function that sets the prototype of an object.
 */