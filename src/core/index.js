import { OBJECT, OBJECT_GET, OBJECT_SET } from './object';
import { APPLY, EXIT, LOOKUP_SCOPE } from './context';

export function INVOKE(Fn, This, Arguments) {

  return APPLY(Fn.Primitive, This, Arguments);
}

export function THROW(Error) {

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

  THROW(ReferenceError, `variable ${Id} is not defined`);
}

// SetVar method
export function ASSIGN(name, V) {

  const scope = LOOKUP_SCOPE(name);
  if (scope) {
    scope.Data[ name ] = V;
    return;
  }

  THROW(ReferenceError, `variable ${Id} is not defined`);
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

  if (!$) {
    // ($, key, value) => fnThrow(`Cannot set property '${key}' of undefined`, TypeError),
    return;
  }
  OBJECT_SET($, key, value)
}

export function NEW(Fn, ...args) {

  const $ = OBJECT({}, Fn.NewPrototype);

  APPLY(Fn, $, args);

  return $;
}
