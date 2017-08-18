import { struct } from '../core/_structs';
import { TYPES } from '../core/_types';
import { MakeFunction } from '../intrinsics/functions';
import { MakeObject } from '../core/object';

export const OBJECT = (initials) => MakeObject(initials);

export const FUNCTION = (initials) => MakeFunction(initials);

export const STRING = (chars) => struct.Primitive(TYPES.STRING, chars);

export const NUMBER = (v) => struct.Primitive(TYPES.NUMBER, v);

export const NEW = ($, ...args) => $.Reflect.construct($, args);

