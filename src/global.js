import { FALSE } from './core/_const';
import { OBJECT } from './core/object';
import { FUNCTION } from './core/function';

const ConstructorsNames = [
  'Array ',
  'ArrayBuffer',
  'Boolean',
  'DataView',
  'Date',
  'Error',
  'EvalError',
  'Float32Array',
  'Float64Array',
  'Function',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Map',
  'Number',
  'Object',
  'Proxy',
  'Promise',
  'RangeError',
  'ReferenceError',
  'RegExp',
  'Set',
  'SharedArrayBuffer',
  'String',
  'Symbol',
  'SyntaxError',
  'TypeError',
  'Uint8Array',
  'Uint8ClampedArray',
  'Uint16Array',
  'Uint32Array',
  'URIError',
  'WeakMap',
  'WeakSet'
];

export default function CreateGlobalObject(Realm) {

  const { Intrinsics, HostDefined } = Realm;

  function createConst(Value) {
    return {
      Value,
      Writable: FALSE,
      Configurable: FALSE,
      Enumerable: FALSE,
    }
  }

  function createFunction(Code) {
    return FUNCTION({ Code })
  }

  function createConstructor(Name) {
    return FUNCTION({
      Name,
      Prototype: OBJECT(Intrinsics[ `${Name}Prototype` ]),
      Code: Intrinsics[ `${Name}Constructor` ]
    })
  }

  const Constructors = ConstructorsNames.reduce((r, Name) => {
    r[ Name ] = createConstructor(Name);
    return r;
  }, {});

  return {

    // Non-equal to anything including itself
    NaN: createConst(Intrinsics.NaN),
    // More then any other number
    Infinity: createConst(Intrinsics.Infinity),
    // Undefined
    undefined: createConst(Intrinsics.UNDEFINED),
    // Undefined
    ['null']: createConst(Intrinsics.NULL),

    // Global functions:
    eval: createFunction(Intrinsics.Eval),

    isNan: createFunction(Intrinsics.isNan),
    isFinite: createFunction(Intrinsics.isFinite),

    parseFloat: createFunction(Intrinsics.parseFloat),
    parseInt: createFunction(Intrinsics.parseInt),

    encode: createFunction(Intrinsics.encode),
    decode: createFunction(Intrinsics.decode),

    encodeURIComponent: createFunction(Intrinsics.encodeURIComponent),
    decodeURIComponent: createFunction(Intrinsics.decodeURIComponent),

    // Global objects:
    Atomics: OBJECT(Intrinsics.Atomics),
    JSON: OBJECT(Intrinsics.JSON),
    Math: OBJECT(Intrinsics.Math),
    Reflect: OBJECT(Intrinsics.Reflect),

    ...Constructors,

    ...HostDefined
  }

}
;
