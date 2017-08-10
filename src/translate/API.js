import { UNDEFINED } from './_const';

export function THROW(Error, type) {

  Exit(null, Error);
}

export function RETURN(Result) {

  Exit(Result, null);
}

// GetVar method
export function VAR(name) {

  const scope = lookupScope(name);
  if (scope) {
    return scope.Vars[ name ];
  }

  THROW(`variable ${name} is not defined`, ReferenceError);
}

// SetVar method
export function ASSIGN(name, V) {

  const scope = lookupScope(name);
  if (scope) {
    scope.Vars[ name ] = V;
    return;
  }

  THROW(`variable ${Id} is not defined`, ReferenceError);
}

export function GET($, key) {

  if ($ === UNDEFINED) {
    return THROW(`Cannot read property '${key}' of undefined`, TypeError);
  }

  if ($ === NULL) {
    return THROW(`Cannot read property '${key}' of null`, TypeError);
  }

  return $.Reflect.get($, key)
}

export function SET($, key, value) {

  if ($ === UNDEFINED) {
    return THROW(`Cannot set property '${key}' of undefined`, TypeError);
  }

  if ($ === NULL) {
    return THROW(`Cannot set property '${key}' of null`, TypeError);
  }

  $.Reflect.set($, key, value)
}

export function INVOKE($, This, Arguments) {

  return $.Reflect.apply($, This, Arguments);
}

export function NEW($, ...args) {

  return $.Reflect.construct(args, $);
}
