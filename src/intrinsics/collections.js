import { OBJECT } from '../core/_structs';
import { STRING } from '../impl/string';

const MAP_PROTO = OBJECT({

  $Get_Size: ($) => MAP_SIZE($.Internal),

  Get: ($, Key) => {

    return MAP_GET($.Internal, Key);
  },

  Set: ($, Key, Value) => {

    MAP_SET($.Internal, Key, Value)

    return $;
  },

  ForEach: ($, f) => ForEach($, (entry, index) => f(entry.Key, entry.Value, index)),

  ToString: ($) => JSON.stringify($)

});

export const MapConstructor = FUNCTION({

  Name: STRING('Map'),

  NewPrototype: MAP_PROTO,

  Code($, initials) {

    $.Internal = MAP(initials);
  }

});

// WeakMap
export default Set;

// WeakSet