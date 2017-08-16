import TYPE from './_types';
import { struct } from './_structs';

/**
 * JS based on quadruple logic:
 * if you choose from duality there are actually four results possible:
 *  yes - certain unambiguous positive choice
 *  no - certain unambiguous negative choice
 *  nothing - certain empty choice
 *  any - uncertain choice(includes all choices)
 *
 */

// UNCERTAIN - ANYTHING POSSIBLE
export const UNDEFINED = struct.Primitive(TYPE.UNDEFINED, 0);

// CERTAINLY NOTHING
export const NULL = struct.Primitive(TYPE.NULL, 0);

// Negative dual choice
export const FALSE = struct.Primitive(TYPE.BOOLEAN_FALSE, 0);

// Positive dual choice
export const TRUE = struct.Primitive(TYPE.BOOLEAN_TRUE, 1);
