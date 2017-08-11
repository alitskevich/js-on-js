import { FALSE } from '../core/_const';
import { OBJECT } from '../core/object';

export const _Global = OBJECT({

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
//   Atomics
//   See 24.4.
//
// 18.4.2JSON
// See 24.5.
//
// 18.4.3Math
// See 20.2.
//
// 18.4.4Reflect

});
