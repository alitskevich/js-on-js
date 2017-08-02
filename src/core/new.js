import { ALLOC, MAKE, GET, SET, SIZE, TYPE, RESIZE } from './infra/_alloc.js';

export function NEW(ctorFn, ...args) {

  const $ = OBJECT({}, ctorFn.Primitive.NewPrototype);

  FUNCTION_APPLY(ctorFn, $, args)

  return $;
};
