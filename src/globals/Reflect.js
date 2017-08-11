import { ORDINARY_OBJECT_REFLECT } from '../core/object_reflect';
import { OBJECT } from '../core/object';

/**
 * Reflect is a built-in object that provides methods for interceptable JavaScript operations.
 * The methods are the same as those of proxy handlers.
 * Reflect is not a function object, so it's not constructible.
 */
Global.Reflect = OBJECT(ORDINARY_OBJECT_REFLECT);