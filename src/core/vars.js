import { CURRENT_CONTEXT } from './context';

const lookupScopeFor = (Id) => {
  for (let scope = CURRENT_SCOPE(); scope; scope = scope.Parent) {
    if (MAP_HAS_KEY(scope.Data, Id)) {
      return scope;
    }
  }
  CURRENT_CONTEXT().Error = new ReferenceError(`variable ${Id} is not defined`);
};

// GetVar method
export function CURRENT_SCOPE() {
  return CURRENT_CONTEXT().VariableScope;
}

// GetVar method
export function VAR_GET(Id) {

  const scope = lookupScopeFor(Id);
  if (scope) {
    return MAP_GET(scope.Data, Id);
  }
}

// GetVar method
export function VAR_SET(Id, Value) {

  const scope = lookupScopeFor(Id);
  if (scope) {
    MAP_SET(scope.Data, Id, Value);
  }
}
