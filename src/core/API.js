import { OBJECT } from './object';
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
export function VAR(key) {

  const scope = LOOKUP_SCOPE(key);
  if (scope) {
    return scope.Data[ key ];
  }
  THROW(ReferenceError, `variable ${Id} is not defined`);
}

// SetVar method
export function ASSIGN(key, V) {

  const scope = LOOKUP_SCOPE(key);
  if (scope) {
    scope.Data[ key ] = V;
    return;
  }
  THROW(ReferenceError, `variable ${Id} is not defined`);
}

export function DOT_GET($, Id) {

  if (!$) {
    // ($, key) => fnThrow(`Cannot read property '${key}' of undefined`, TypeError),
    return UNDEFINED;
  }
}

export function DOT_SET($, Id, Value) {

  if (!$) {
    // ($, key, value) => fnThrow(`Cannot set property '${key}' of undefined`, TypeError),
    return;
  }
}

export function NEW(Fn, ...args) {

  const $ = OBJECT({}, Fn.NewPrototype);

  APPLY(Fn, $, args);

  return $;
}
