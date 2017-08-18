import { struct } from './_structs';
import { TYPES } from './_types';

/**
 * JS supports a `full-set` logic:
 * if you choose from duality there are actually four results possible:
 *
 *  yes - certain unambiguous positive choice
 *  no - certain unambiguous negative choice
 *  nothing - certain empty choice
 *  any - uncertain choice(includes all choices)
 *
 */

// UNCERTAIN - ANYTHING POSSIBLE
export const UNDEFINED = struct.Primitive(TYPES.UNDEFINED, 0);

// CERTAINLY NOTHING
export const NULL = struct.Primitive(TYPES.NULL, 0);

// Negative dual choice
export const FALSE = struct.Primitive(TYPES.BOOLEAN_FALSE, 0);

// Positive dual choice
export const TRUE = struct.Primitive(TYPES.BOOLEAN_TRUE, 1);
