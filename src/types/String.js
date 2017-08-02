const STRING_PROTO = OBJECT({

  toString: ($) => $

});

export const StringConstructor = FUNCTION({

  NewPrototype: STRING_PROTO,

  Code($, chars) {

    $.Primitive = STRING(chars);
  }
});
