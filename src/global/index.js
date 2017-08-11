import { FALSE } from '../core/_const';
import { OBJECT } from '../core/object';

import Atomics from './Atomics';
import JSON from './JSON';
import Math from './Math';
import Reflect from './Reflect';

export default OBJECT({

  // Non-equal to anything including itself
  NaN: {
    Value: NaN,
    Writable: FALSE,
    Configurable: FALSE,
    Enumerable: FALSE,
  },

  // More then any other number
  Infinity: {
    Value: Infinity,
    Writable: FALSE,
    Configurable: FALSE,
    Enumerable: FALSE,
  },

  // Undefined
  Undefined: {
    Value: UNDEFINED,
    Writable: FALSE,
    Configurable: FALSE,
    Enumerable: FALSE,
  },

  // ----- routines:
  eval() {

  },
  isNan() {

  },
  isFinite() {

  },
  parseFloat() {

  },
  parseInt() {

  },
  encode() {

  },
  decode() {

  },
  encodeURIComponent() {

  },
  decodeURIComponent() {

  },

  // Constructors:
//   1 Array 
// 2 ArrayBuffer 
// 3 Boolean 
// 4 DataView 
// 5 Date 
// 6 Error 
// 7 EvalError 
// 8 Float32Array 
// 9 Float64Array 
// 10 Function 
// 11 Int8Array 
// 12 Int16Array 
// 13 Int32Array 
// 14 Map 
// 15 Number 
// 16 Object 
// 17 Proxy 
// 18 Promise 
// 19 RangeError 
// 20 ReferenceError 
// 21 RegExp 
// 22 Set 
// 23 SharedArrayBuffer 
// 24 String 
// 25 Symbol 
// 26 SyntaxError 
// 27 TypeError 
// 28 Uint8Array 
// 29 Uint8ClampedArray 
// 30 Uint16Array 
// 31 Uint32Array 
// 32 URIError 
// 33 WeakMap 
// 34 WeakSet 

// Other:
  Atomics,
  JSON,
  Math,
  Reflect

});
