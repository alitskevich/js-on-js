export const BooleanPrototype = {

  ValueOf: ($) => $.Internal,

  ToString: ($) => OBJECT_PRIMITIVE($) === TRUE ? 'true' : 'false'
};

export const BooleanConstructor = ($, V) => {

  $.Internal = TRULY(V) ? TRUE : FALSE;
};