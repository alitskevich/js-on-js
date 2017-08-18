import { FALSE, TRUE } from '../core/_const';

export const BooleanPrototype = {

  ValueOf: ($) => $.Internal,

  ToString: ($) => $.Internal === TRUE ? 'true' : 'false'
};

export const BooleanConstructor = ($, V) => {

  $.Internal = TRUTHY(V) ? TRUE : FALSE;
};