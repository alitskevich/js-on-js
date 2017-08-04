const STRING_PROTO = OBJECT({

  ToString: ($) => $

});

export const StringConstructor = FUNCTION({

  NewPrototype: STRING_PROTO,

  Code($, chars) {

    $.Primitive = STRING(chars);
  }
});
