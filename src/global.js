import { FALSE } from './core/_const';
import { MakeObject } from './core/object';
import { MakeFunction } from './intrinsics/functions';

const ConstructorsNames = [
  'Array',
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
    return MakeFunction({ Code })
  }

  function createConstructor(Name) {
    return MakeFunction({
      Name,
      Prototype: MakeObject(Intrinsics[ `${Name}Prototype` ]),
      Code: Intrinsics[ `${Name}Constructor` ]
    })
  }

  const Constructors = ConstructorsNames.reduce((r, Name) => {
    r[ Name ] = createConstructor(Name);
    return r;
  }, {});

  const GlobalObject = {

    // Non-equal to anything including itself
    NaN: createConst(Intrinsics.NaN),
    // More then any other number
    Infinity: createConst(Intrinsics.Infinity),
    // Undefined
    undefined: createConst(Intrinsics.UNDEFINED),
    // null
    ['null']: createConst(Intrinsics.NULL),

    // Global functions:
    eval: createFunction(Intrinsics.Eval),

    isNan: createFunction(Intrinsics.isNan),
    isFinite: createFunction(Intrinsics.isFinite),

    parseFloat: createFunction(Intrinsics.parseFloat),
    parseInt: createFunction(Intrinsics.parseInt),

    encode: createFunction(Intrinsics.encodeURI),
    decode: createFunction(Intrinsics.decodeURI),

    encodeURIComponent: createFunction(Intrinsics.encodeURIComponent),
    decodeURIComponent: createFunction(Intrinsics.decodeURIComponent),

    // Global objects:
    Atomics: MakeObject(Intrinsics.Atomics),
    JSON: MakeObject(Intrinsics.JSON),
    Math: MakeObject(Intrinsics.Math),
    Reflect: MakeObject(Intrinsics.Reflect),

    ...Constructors,

    ...HostDefined
  };

  Realm.GlobalObject = GlobalObject;

  return GlobalObject;

}
;
