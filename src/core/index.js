import { OBJECT, OBJECT_GET, OBJECT_SET } from './object';
import { APPLY, EXIT, LOOKUP_SCOPE } from './context';

export function INVOKE(Fn, This, Arguments) {

  return APPLY(Fn.Subject, This, Arguments);
}

export function THROW(Error, type) {

  EXIT(null, Error);
}

export function RETURN(Result) {

  EXIT(Result, null);
}

// GetVar method
export function VAR(name) {

  const scope = LOOKUP_SCOPE(name);
  if (scope) {
    return scope.Data[ name ];
  }

  THROW(`variable ${Id} is not defined`, ReferenceError);
}

// SetVar method
export function ASSIGN(name, V) {

  const scope = LOOKUP_SCOPE(name);
  if (scope) {
    scope.Data[ name ] = V;
    return;
  }

  THROW(`variable ${Id} is not defined`, ReferenceError);
}

export function GET($, key) {

  if ($ === undefined) {
    return THROW(`Cannot read property '${key}' of undefined`, TypeError);
  }

  if ($ === null) {
    return THROW(`Cannot read property '${key}' of null`, TypeError);
  }

  return OBJECT_GET($, key)
}

export function SET($, key, value) {

  if (!$ === undefined) {
    // ($, key, value) => fnThrow(`Cannot set property '${key}' of undefined`, TypeError),
    return;
  }

  if ($ === null) {
    return THROW(`Cannot set property '${key}' of null`, TypeError);
  }

  OBJECT_SET($, key, value)
}

export function NEW(Fn, ...args) {

  const $ = OBJECT({}, Fn.NewPrototype);

  APPLY(Fn, $, args);

  return $;
}
